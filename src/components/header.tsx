import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "@/hooks/usePage";
import { useSignOut } from "@/hooks/useSignOut";
import logo from "@/assets/logo.svg";
import styles from "@/styles/components/Header.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Button from "./button";
import SignOutIcon from "@/Icons/signOutIcon";
import { AuthUser } from "@/types/AuthUser";

const Header = () => {
  const { toStart, toHome, toProfile } = usePage();
  const authUser = useAuthUser();
  const { pathname } = useLocation();
  const { signOut, loading, error } = useSignOut();
  const { uid } = useParams();

  const logoNavigate = (authUser: AuthUser) => {
    if (authUser) {
      if (!authUser.displayName || !authUser.photoURL) {
        toProfile(authUser.uid!);
      } else {
        toHome(authUser.uid!);
      }
    } else {
      toStart();
    }
  };

  return (
    <>
      {pathname !== "/" && (
        <header
          className={`${styles.header} ${
            authUser ? styles.login : styles.notLogin
          }`}
        >
          {/* after log in switch toHome */}
          <img
            src={logo}
            typeof="image/svg+xml"
            alt="logo"
            width="200px"
            height="67px"
            onClick={() => logoNavigate(authUser!)}
            className={styles.logo}
          />
          {authUser && (
            <div className={styles.profile}>
              <p>{authUser.displayName}</p>
              {authUser.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt=""
                  className={styles.avatar}
                  onClick={() => toProfile(uid!)}
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    width: 60,
                    height: 60,
                    "@media screen and (max-width:600px)": {
                      width: 40,
                      height: 40,
                    },
                  }}
                  onClick={() => toProfile(uid!)}
                />
              )}
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={signOut}
                startIcon={<SignOutIcon />}
                header
                disabled={loading}
              >
                Sign Out
              </Button>
            </div>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
