import React, { useState, useEffect, FC, memo } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { formatTime } from "@/lib/formatTime";
import { getUserInfo } from "@/lib/getUserInfo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "@/styles/components/ChatMessage.module.scss";
import { Message } from "@/types/Message";

import Avatar from "./avatar";
import InfoMessage from "./infoMessage";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

type Info = {
  displayName: string;
  photoURL: string | null;
};

const ChatMessage: FC<Message> = memo(
  ({
    from,
    to,
    createdAt,
    id,
    message,
    info,
    status,
    displayName,
    isLastMessage,
  }) => {
    const { uid, partnerid, groupid } = useParams();
    const [userInfo, setUserInfo] = useState<Info>({
      displayName: "",
      photoURL: "",
    });
    const { chatRef, smoothScroll } = useSmoothScroll(isLastMessage);

    useEffect(() => {
      smoothScroll(chatRef);
    }, []);
    // const [partnerName, setPartnerName] = useState("");
    // const [partnerPhoto, setPartnerPhoto] = useState("");

    // const getPartnerInfo = async (partnerid: string) => {
    //   const userRef = doc(db, "users", partnerid);
    //   const snapshot = await getDoc(userRef);
    //   return {
    //     displayName: snapshot.data()!.displayName,
    //     photoURL: snapshot.data()!.photoURL,
    //   };
    // };

    // const getFromInfo = async (from: string, groupid: string) => {
    //   const fromRef = doc(db, "groups", groupid, "members", from);
    //   const snapshot = await getDoc(fromRef);
    //   if (snapshot.data()) {
    //     return {
    //       displayName: snapshot?.data()?.displayName,
    //       photoURL: snapshot?.data()?.photoURL,
    //     };
    //   } else {
    //     return {
    //       displayName: "Unknown",
    //       photoURL: snapshot?.data()?.photoURL,
    //     };
    //   }
    // };

    useEffect(() => {
      getUserInfo(from).then((user) => {
        if (user) {
          setUserInfo({
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        } else {
          setUserInfo({
            displayName: "Unknown",
            photoURL: null,
          });
        }
      });
      // Set Unknown user if the user is existed.
      // if (partnerid) {
      //   getPartnerInfo(partnerid).then(({ displayName, photoURL }) => {
      //     setPartnerName(displayName);
      //     setPartnerPhoto(photoURL);
      //   });
      // } else if (groupid) {
      //   getFromInfo(from, groupid).then(({ displayName, photoURL }) => {
      //     setPartnerName(displayName);
      //     setPartnerPhoto(photoURL);
      //   });
      // }
    }, []);

    return (
      <>
        {info ? (
          <InfoMessage
            status={status!}
            to={to!}
            from={from}
            isLastMessage={isLastMessage}
          />
        ) : from === uid ? (
          <ul className={`${styles.message} ${styles.own}`} ref={chatRef}>
            <li className={styles.text}>
              <p className={styles.bubble}>{message}</p>
              {createdAt !== null && (
                <p className={styles.time}>{formatTime(createdAt)}</p>
              )}
            </li>
          </ul>
        ) : (
          <ul className={`${styles.message} ${styles.partner}`} ref={chatRef}>
            <li className={styles.profile}>
              {userInfo.photoURL ? (
                <Avatar size={40} storageRef={userInfo.photoURL} chat />
              ) : (
                <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
              )}
              <p>
                {userInfo.displayName !== undefined
                  ? userInfo.displayName
                  : "Unknown"}
              </p>
            </li>
            <li className={styles.text}>
              <p className={styles.bubble}>{message}</p>
              {createdAt !== null ? (
                <p className={styles.time}>{formatTime(createdAt)}</p>
              ) : (
                <Skeleton variant="text" width={40} height={24} />
              )}
            </li>
          </ul>
        )}
      </>
    );
  }
);

export default ChatMessage;
