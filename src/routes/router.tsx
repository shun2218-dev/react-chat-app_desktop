import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Start = lazy(() => import("@/pages/start"));
const Login = lazy(() => import("@/pages/login"));
const Regist = lazy(() => import("@/pages/regist"));
const Reset = lazy(() => import("@/pages/reset"));
const Home = lazy(() => import("@/pages/home"));
const Private = lazy(() => import("@/pages/private"));
const Group = lazy(() => import("@/pages/group"));
const Profile = lazy(() => import("@/pages/profile"));
const Complete = lazy(() => import("@/pages/complete"));
const Join = lazy(() => import("@/pages/join"));
const Create = lazy(() => import("@/pages/create"));
const GroupRoom = lazy(() => import("@/pages/groupRoom"));
const NotFound = lazy(() => import("@/pages/notFound"));

import Layout from "@/components/layout";
import AuthLayout from "@/components/authlayout";

const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Start />} />
          <Route path="login" element={<Login />} />
          <Route path="regist" element={<Regist />} />
          <Route path="reset" element={<Reset />} />
          <Route path="reset/complete" element={<Complete />} />
          <Route path="/:uid" element={<AuthLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="home" element={<Home />} />
            <Route path="group" element={<Group />} />
            <Route path="group/join" element={<Join />} />
            <Route path="group/create" element={<Create />} />
            <Route path="group/:groupid" element={<GroupRoom />} />
            <Route path="private" element={<Private />} />
            <Route path="private/:partnerid" element={<Private />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
