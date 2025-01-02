import ResetPasswordPage from "@/features/reset-password";
import React from "react";

const ResetPasssword = ({ params }: { params: { token: string } }) => {
  return <ResetPasswordPage token={params.token}/>;
};

export default ResetPasssword;
