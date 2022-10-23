import React, { FC, ReactNode } from "react";
import styles from "@/styles/components/Card.module.scss";

type Card = {
  children: ReactNode;
  onClick?: () => void;
  startIcon?: ReactNode;
};

const Card: FC<Card> = ({ children, onClick, startIcon }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {startIcon}
      {children}
    </div>
  );
};

export default Card;
