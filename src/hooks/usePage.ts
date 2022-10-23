import { NavigationState } from "@/types/NavigationState";
import { useNavigate } from "react-router-dom";

export const usePage = () => {
  const navigate = useNavigate();

  const toStart = () => {
    navigate("/");
  };

  const toLogin = () => {
    navigate("/login");
  };

  const toRegist = () => {
    navigate("/regist");
  };

  const toReset = () => {
    navigate("/reset");
  };

  const toComplete = (state: NavigationState) => {
    navigate("/reset/complete", { state });
  };

  const toProfile = (uid: String, state?: NavigationState) => {
    if (state) {
      navigate(`/${uid}/profile`, { state });
    } else {
      navigate(`/${uid}/profile`);
    }
  };

  const toHome = (uid: String, state?: NavigationState) => {
    if (state) {
      navigate(`/${uid}/home`, { state });
    } else {
      navigate(`/${uid}/home`);
    }
  };

  const toPrivate = (uid: String) => {
    navigate(`/${uid}/private`);
  };

  const toPrivateRoom = (uid: String, partnerid: string) => {
    navigate(`/${uid}/private/${partnerid}`);
  };

  const toGroup = (uid: String) => {
    navigate(`/${uid}/group`);
  };

  const toGroupRoom = (
    uid: String,
    groupid: string,
    state?: NavigationState
  ) => {
    navigate(`/${uid}/group/${groupid}`, { state });
  };

  const toJoin = (uid: String) => {
    navigate(`/${uid}/group/join`);
  };

  const toCreate = (uid: String) => {
    navigate(`/${uid}/group/create`);
  };

  const toRedirect = (state: NavigationState) => {
    navigate(".", { replace: true, state });
  };

  return {
    toStart,
    toLogin,
    toRegist,
    toReset,
    toComplete,
    toProfile,
    toHome,
    toPrivate,
    toPrivateRoom,
    toGroup,
    toGroupRoom,
    toJoin,
    toCreate,
    toRedirect,
  };
};
