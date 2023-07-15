import React from "react";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import ForgotPasssword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";

export const authRouter = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasssword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];
