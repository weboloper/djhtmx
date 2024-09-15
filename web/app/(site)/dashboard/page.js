"use client";
import React from "react";
import ProfileForm from "./components/profileForm";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  return <div>{user && <ProfileForm user={user} />}</div>;
};

export default Dashboard;
