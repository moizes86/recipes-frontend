import React, { useEffect } from "react";

import { createUser } from "../services/API_Services/UserAPI";
import useForm from "../useForm";

import InputField from "./Forms/InputField";
import FormBottom from "./Forms/FormBottom";

import "../styles/styles.scss";


const Signup = () => {
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
    countdown,
  } = useForm();

  useEffect(() => {
    setValues({ email: "", password: "" });

    return () => setValues({ email: "", password: "" });
  }, [setValues]);

  const redirectTo = "/login";

  return (
    <div className="signup">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitUser(createUser, redirectTo);
        }}
        noValidate
      >
        <h5>Signup</h5>
        <InputField
          label="Email"
          name="email"
          type="email"
          errors={errors.email}
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <InputField
          label="Username"
          name="username"
          type="text"
          value={values.username}
          errors={errors.username}
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

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          errors={errors.confirmPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <FormBottom btnText="Signup" error={error} data={data} message={message} countdown={countdown} loading={loading} />
      </form>
    </div>
  );
};
export default Signup;
