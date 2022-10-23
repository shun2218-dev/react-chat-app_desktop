import React, { useEffect } from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { Outlet } from "react-router-dom";
import { NavigationState } from "@/types/NavigationState";

const AuthLayout = () => {
  const authUser = useAuthUser();
  const { toLogin, toProfile } = usePage();
  useEffect(() => {
    if (authUser?.uid) {
      if (!authUser?.photoURL || !authUser.displayName) {
        const flashMessage = {
          title: "Information",
          status: "info",
          text: "Please set up your profile to start chatting.",
        } as NavigationState;
        toProfile(authUser?.uid, flashMessage);
      }
    } else {
      toLogin();
    }
  }, [authUser?.uid]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
