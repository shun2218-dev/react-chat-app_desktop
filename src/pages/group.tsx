import React from "react";
import styles from "@/styles/pages/Group.module.scss";
import { usePage } from "@/hooks/usePage";
import { useParams } from "react-router-dom";

import Card from "@/components/card";

const Group = () => {
  const { toJoin, toCreate } = usePage();
  const { uid } = useParams();
  return (
    <>
      <div className={styles.cardContainer}>
        <Card onClick={() => toJoin(uid!)}>Join a already exists group</Card>
        <Card onClick={() => toCreate(uid!)}>Create a new group</Card>
      </div>
    </>
  );
};

export default Group;
