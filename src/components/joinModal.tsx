import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePage } from "@/hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import styles from "@/styles/components/Modal.module.scss";
import utilStyles from "@/styles/utils/utils.module.scss";
import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getUserInfo } from "@/lib/getUserInfo";
import { informationMessage } from "@/lib/infomationMessage";
import { CustomModal } from "@/types/CustomModal";

import Modal from "./modal";
import Button from "./button";

const JoinModal: FC<CustomModal> = ({ open, modalToggle }) => {
  const authUser = useAuthUser();
  const { uid, groupid } = useParams();
  const { toJoin } = usePage();
  const [groupInfo, setGroupInfo] = useState<DocumentData>({});
  const [profileEmpty, setProfileEmpty] = useState(false);

  const invitationCheck = async (uid: string, groupid: string) => {
    const inviteRef = collection(db, "groups", groupid, "invitations");
    await getDocs(inviteRef).then(async (snapshot) => {
      const ids = snapshot.docs.map((doc) => doc.id);
      if (ids.includes(uid)) {
        const targetRef = doc(db, "groups", groupid, "invitations", uid);
        await deleteDoc(targetRef);
      }
    });
  };
  const joinGroup = async (groupid: string, uid: string) => {
    const membersRef = doc(db, "groups", groupid, "members", uid);
    await getUserInfo(uid)
      .then(async (member) => {
        await setDoc(membersRef, member)
          .then(async () => {
            await informationMessage(uid, groupid, "joined");
          })
          .then(async () => {
            await invitationCheck(uid!, groupid!);
          });
      })
      .finally(() => modalToggle("join"));
  };

  useEffect(() => {
    if (!authUser?.displayName || !authUser.photoURL) {
      setProfileEmpty(true);
    } else {
      setProfileEmpty(false);
    }
  }, [groupInfo]);

  useEffect(() => {
    if (groupid) {
      const groupRef = doc(db, "groups", groupid!);
      getDoc(groupRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setGroupInfo({ ...docSnapshot.data() });
        }
      });
    }
  }, []);
  return (
    <>
      <Modal title="Join this group?" open={open} error={profileEmpty}>
        {groupInfo && (
          <>
            <img
              src={groupInfo.photoURL}
              alt=""
              className={utilStyles.avatar}
            />
            <div>
              <p className={styles.contentTitle}>Group name</p>
              <div className={styles.contentBox}>{groupInfo.groupName}</div>
            </div>
            <div>
              <p className={styles.contentTitle}>Description</p>
              <div className={styles.contentBox}>{groupInfo.description}</div>
            </div>
          </>
        )}
        <div className={`${styles.modalButton} ${styles.row}`}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => joinGroup(groupid!, uid!)}
            fullWidth
            disabled={profileEmpty}
          >
            Yes
          </Button>
          <Button
            type="button"
            color="transparent"
            variant="outlined"
            onClick={() => toJoin(uid!)}
            fullWidth
          >
            No
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default JoinModal;
