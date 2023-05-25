import googleLogo from "../../assets/logo/googlelogo.svg";
import React from "react";
import {useGoogleLogin} from "@react-oauth/google";

const Google = ({successCallback, errCallback}) => {

  const googleLoginHook = useGoogleLogin({
    flow: "implicit",
    onSuccess: successCallback,
    onError: errCallback,
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
  })

  return  <div className='login-facebook-btn' onClick={() => googleLoginHook()}>
    <img className='facebook-logo' src={googleLogo} alt="Google Logo"/>
    <div className='facebook-btn-text'>Google</div>
    <div></div>
  </div>
}

export default Google;
