import React, { FC, memo, useEffect, useState } from "react";
import styles from "@/styles/components/ChatMessage.module.scss";
import { getUserInfo } from "@/lib/getUserInfo";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

type Info = {
  status: "joined" | "existed" | "invited" | "canceled";
  from: string;
  to: string;
  isLastMessage: boolean;
};

const InfoMessage: FC<Info> = memo(({ status, from, to, isLastMessage }) => {
  const [toName, setToName] = useState("");
  const [fromName, setFromName] = useState("");
  const { infoRef, smoothScroll } = useSmoothScroll(isLastMessage);

  useEffect(() => {
    smoothScroll(infoRef);
  }, []);

  useEffect(() => {
    if (to) {
      getUserInfo(to).then((user) => {
        if (user) {
          setToName(user.displayName);
        }
      });
    }
    getUserInfo(from).then((user) => {
      if (user) {
        setFromName(user.displayName);
      }
    });
  }, []);
  if (status === "joined" || status === "existed") {
    return (
      <div className={styles.info} ref={infoRef}>
        <p>{`${fromName} is ${status}!`}</p>
      </div>
    );
  } else if (status === "invited") {
    return (
      <div className={styles.info} ref={infoRef}>
        <p>{`${toName} is ${status} by ${fromName}!`}</p>
      </div>
    );
  } else {
    return (
      <div className={styles.info} ref={infoRef}>
        <p>{`${fromName} ${status} invitation for ${toName}!`}</p>
      </div>
    );
  }
});

export default InfoMessage;
