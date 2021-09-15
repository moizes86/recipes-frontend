import React, { useEffect } from "react";

import useForm from "../useForm";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onUpdateUser } from "../redux/actions";

// Routing
import { updateUserDetails } from "../services/API_Services/UserAPI";

import InputField from "./Forms/InputField";
import FormBottom from "./Forms/FormBottom";

const MyProfile = () => {
  let { activeUser } = useSelector((state) => state);
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
    countdown,
  } = useForm();

  useEffect(() => {
    setValues({
      email: activeUser.email,
      username: activeUser.username,
      password: activeUser.password,
      confirmPassword: "",
    });
  }, []);

  useEffect(() => {
    if (data) {
      return () => dispatch(onUpdateUser({ ...activeUser, ...data }));
    }
  }, [data, dispatch, activeUser]);

  const rediertTo = "/";

  return (
    <div className="my-profile">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitUser(updateUserDetails, rediertTo);
        }}
        noValidate
      >
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

        <FormBottom
          btnText="Update"
          loading={loading}
          message={message}
          error={error}
          data={data}
          countdown={countdown}
        />
      </form>
    </div>
  );
};
export default MyProfile;
