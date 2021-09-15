import React, { useEffect } from "react";

// Redux
import { onLogin } from "../redux/actions";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/API_Services/UserAPI";
import useForm from "../useForm";

// Components
import InputField from "./Forms/InputField";

import "../styles/styles.scss";
import FormBottom from "./Forms/FormBottom";

const Login = () => {
  const dispatch = useDispatch();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmitUser,
    loading,
    error,
    setValues,
    message,
    data,
    countdown
  } = useForm();

  useEffect(() => {
    setValues({ email: "", password: "" });
    return () => setValues({ email: "", password: "" });
  }, [setValues]);

  useEffect(() => {
    dispatch(onLogin(data));
  }, [data, dispatch]);

  const redirectTo = '/'

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitUser(loginUser, redirectTo);
        }}
        noValidate
      >
        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          errors={errors.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          errors={errors.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <FormBottom btnText="Login" loading={loading} message={message} error={error} data={data} countdown={countdown}/>
      </form>
    </div>
  );
};
export default Login;
