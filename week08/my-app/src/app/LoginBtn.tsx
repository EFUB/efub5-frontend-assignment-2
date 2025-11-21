"use client"

import { signIn } from "next-auth/react";

export default function LoginBtn () {
  const onLogin = (): void => {
    signIn("github");
  };

  // onClick에 signIn을 넣으면 버튼 클릭시 github로 이동
  return <button onClick={onLogin} className="loginbtn" >로그인</button>
}