import React from "react";
import { useLocation } from "react-use";
import { usePage } from "@/hooks/usePage";
import utilStyles from "@/styles/utils/utils.module.scss";

import Button from "@/components/button";

const NotFound = () => {
  const { toLogin } = usePage();
  const { pathname } = useLocation();
  return (
    <div className={utilStyles.flexCenter}>
      <h1>404 Not Found</h1>
      <p>
        Invalid Pathname:{" "}
        <span className={utilStyles.errorText}>{pathname}</span>
      </p>
      <div>
        <Button type="button" color="primary" onClick={toLogin}>
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
