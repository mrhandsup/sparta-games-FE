import React from "react";
import { useSearchParams } from "react-router-dom";

type Props = {};

const SignUp = (props: Props) => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const login_type = searchParams.get("login_type");

  return <div>SignUp</div>;
};

export default SignUp;
