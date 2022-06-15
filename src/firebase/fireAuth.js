import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { user } from "./fireInit";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (handleLogInFunc) => {
  signInWithPopup(user, provider)
    .then((result) => {
      handleLogInFunc(result.user);
    })
    .catch((error) => {
      console.log(error);
    });
};
