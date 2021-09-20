import React, { useEffect } from "react";

import { createUser } from "../DAL/UserAPI";
import useForm from "../useForm";
import { Link } from "react-router-dom";

import InputField from "./InputField";
import FormBottom from "./FormBottom";
import CheckCircleSuccess from "./CheckCircleSuccess";
import MyModal from "./MyModal";

import "../styles/styles.scss";

const Signup = () => {
  const {
    values,
    validationErrors,
    loading,
    error,
    data,
    handleBlur,
    handleChange,
    handleSubmitUser,
    setValues,
  } = useForm();

  useEffect(() => {
  const initialValues = { email: "", username: "", password: "", confirmPassword: "" };

    setValues(initialValues);

    return () => setValues(initialValues);
  }, [setValues]);

  return (
    <div className="signup">
      {!data?.message ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitUser(createUser);
          }}
          noValidate
        >
          <h5>Signup</h5>
          <InputField
            label="Email"
            name="email"
            type="email"
            validationErrors={validationErrors.email}
            value={values.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          <InputField
            label="Username"
            name="username"
            type="text"
            value={values.username}
            validationErrors={validationErrors.username}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            validationErrors={validationErrors.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            validationErrors={validationErrors.confirmPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          <FormBottom btnText="Signup" error={error} loading={loading}>
            {data && data.payload && !error && (
              <MyModal data={data}>
                <p className="text-center p-2">
                  Please{" "}
                  <Link to={`/verify/${data.payload.email}`}>
                    <u className="text-primary">verify</u>
                  </Link>{" "}
                  your account
                </p>
              </MyModal>
            )}
          </FormBottom>
        </form>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <CheckCircleSuccess message={data?.message} />
          <p className="text-center p-2">
            Please{" "}
            <Link to={`/verify/${data.payload.email}`}>
              <u className="text-primary">verify</u>
            </Link>{" "}
            your account
          </p>
        </div>
      )}
    </div>
  );
};
export default Signup;
