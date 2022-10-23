import React, { FormEvent, useRef } from "react";
import { usePage } from "@/hooks/usePage";
import { usePasswordReset } from "@/hooks/usePasswordReset";

import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import MailIcon from "@/Icons/mailIcon";
import ResetIcon from "@/Icons/resetIcon";

const Reset = () => {
  const { toLogin } = usePage();
  const { passwordReset } = usePasswordReset();
  const emailRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      const email = emailRef.current.value;
      await passwordReset(email);
    }
  };
  return (
    <>
      <Form
        title="Enter your Email address"
        secondTitle="to reset your password."
        onSubmit={onSubmit}
        startIcon={<MailIcon title />}
      >
        <Input
          label="Email"
          type="email"
          placeholder="Your Email"
          ref={emailRef}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="30px 0 0"
          startIcon={<ResetIcon />}
        >
          Reset Password
        </Button>
        <Button type="button" color="transparent" onClick={toLogin}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default Reset;
