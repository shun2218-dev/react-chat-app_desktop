import React, { FC, FormEvent, ReactNode } from "react";
import styles from "@/styles/components/Form.module.scss";

type Form = {
  children: ReactNode;
  title: string;
  secondTitle?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  startIcon?: ReactNode;
};

const Form: FC<Form> = ({
  children,
  title,
  secondTitle,
  onSubmit,
  startIcon,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>
        {startIcon}
        {title}
        {secondTitle && (
          <>
            <br />
            {secondTitle}
          </>
        )}
      </h2>
      {children}
    </form>
  );
};

export default Form;
