import React, { FC } from "react";
import styles from "@/styles/components/MessageDate.module.scss";

type FormatDate = {
  year: string;
  month: string;
  day: string;
};

const MessageDate: FC<FormatDate> = ({ year, month, day }) => {
  return <div className={styles.date}>{`${year}/${month}/${day}`}</div>;
};

export default MessageDate;
