import React from "react";
import styles from "@/styles/icons/Icon.module.scss";

const ResetIcon = ({ title = false }: { title?: boolean }) => {
  return (
    <svg
      className={`${styles.icon} ${title && styles.title}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      ></path>
    </svg>
  );
};

export default ResetIcon;
