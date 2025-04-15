"use client";
import React, { useState } from "react";
import LoginForm from "@/src/components/molecules/forms/SignIn";
import RegisterForm from "@/src/components/molecules/forms/SignUp";
import styles from "./auth.module.scss";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authPage}>
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Page;
