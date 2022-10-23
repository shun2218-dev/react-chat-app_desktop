import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "@/styles/pages/Join.module.scss";
import utilStyles from "@/styles/utils/utils.module.scss";
import { usePage } from "@/hooks/usePage";
import { useParams } from "react-router-dom";
import Form from "@/components/form";

type Groups = {
  id: string;
  groupName: string;
  owner: string;
  photoURL: string;
};

const Join = () => {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { toGroupRoom } = usePage();
  const { uid } = useParams();

  useEffect(() => {
    setLoading(true);
    const ref = collection(db, "groups");
    const unSub = onSnapshot(ref, (snapshot) => {
      setGroups(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as Groups;
        })
      );
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <Form title="Group List">
      <ul className={styles.groupList}>
        {groups.length ? (
          groups.map(({ id, groupName, photoURL }) => (
            <li
              className={styles.group}
              key={id}
              onClick={() => toGroupRoom(uid!, id)}
            >
              <img
                src={photoURL}
                alt={groupName}
                className={utilStyles.avatar}
              />
              <p className={styles.name}>{groupName}</p>
            </li>
          ))
        ) : loading ? (
          <li>...loading</li>
        ) : (
          <li>Not Found</li>
        )}
      </ul>
    </Form>
  );
};

export default Join;
