import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { formatDate } from "@/lib/formatDate";
import styles from "@/styles/pages/GroupRoom.module.scss";
import { useChatMessage } from "@/hooks/useChatMessage";

import MessageInput from "@/components/messageInput";
import UserList from "@/components/userList";
import ChatMessage from "@/components/chatMessage";
import MessageDate from "@/components/messageDate";
import { useAuthUser } from "@/atoms/useAuthUser";

const GroupRoom = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { uid, groupid } = useParams();
  const { chatMessages } = useChatMessage(true);
  const authUser = useAuthUser();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      if (!authUser?.displayName || !authUser?.photoURL) {
        alert("Please set up your profile to chat!");
      } else {
        setLoading(true);
        const groupRef = collection(db, "groups", groupid!, "messages");
        await addDoc(groupRef, {
          message,
          from: uid!,
          createdAt: serverTimestamp(),
        }).then(() => setMessage(""));
        setLoading(false);
      }
    }
  };

  return (
    <>
      <UserList group />
      <div className={styles.chatRoom}>
        {chatMessages.length ? (
          chatMessages.map((doc, index) => {
            if (doc.createdAt !== null) {
              const targetDate = formatDate(doc);
              const isLastMessage = chatMessages.length - 1 === index;
              if (index === 0) {
                return (
                  <Fragment key={doc.id}>
                    <MessageDate {...targetDate} />
                    <ChatMessage {...doc} isLastMessage={isLastMessage} />
                  </Fragment>
                );
              } else {
                const preDate = formatDate(chatMessages[index - 1]);
                if (
                  preDate.month === targetDate.month &&
                  preDate.day === targetDate.day
                ) {
                  return (
                    <ChatMessage
                      key={doc.id}
                      {...doc}
                      isLastMessage={isLastMessage}
                    />
                  );
                } else {
                  return (
                    <Fragment key={doc.id}>
                      <MessageDate {...targetDate} />
                      <ChatMessage {...doc} isLastMessage={isLastMessage} />
                    </Fragment>
                  );
                }
              }
            }
          })
        ) : loading ? (
          <div>...loading</div>
        ) : (
          <div>No history.</div>
        )}
      </div>
      <MessageInput
        onSubmit={onSubmit}
        loading={loading}
        state={message}
        setState={setMessage}
      />
    </>
  );
};

export default GroupRoom;
