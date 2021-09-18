import React, { useEffect } from "react";

import useForm from "../useForm";
import { useHistory } from "react-router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onUpdateUser } from "../redux/actions";

// Routing
import { updateUserDetails } from "../DAL/UserAPI";

import InputField from "./InputField";
import FormBottom from "./FormBottom";
import MyModal from "./MyModal";

const MyProfile = () => {
  
  let { activeUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    values,
    validationErrors,
    handleBlur,
    handleChange,
    handleSubmitUser,
    loading,
    error,
    setValues,
    message,
    data,
  } = useForm();

  useEffect(() => {
    setValues({
      email: activeUser.email,
      username: activeUser.username,
      password: activeUser.password,
      confirmPassword: "",
    });
  }, [activeUser.email, activeUser.username, activeUser.password, activeUser.confirmPassword, setValues]);

  useEffect(() => {
    if (data) {
      dispatch(onUpdateUser({ ...activeUser, ...data.payload }));
    }
  }, [data, dispatch, activeUser]);


  return (
    <div className="my-profile">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitUser(updateUserDetails);
        }}
        noValidate
      >
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

        <FormBottom btnText="Update" loading={loading} message={message} error={error}>
          <MyModal data={data}>
            {data?.payload && (
              <button className="btn-primary p-2 m-3" onClick={() => history.push("/")}>
                Homepage
              </button>
            )}
          </MyModal>
        </FormBottom>
      </form>
    </div>
  );
};
export default MyProfile;
