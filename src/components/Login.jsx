import React, { useEffect } from "react";

// Redux
import { onLogin } from "../redux/actions";
import { useDispatch } from "react-redux";
import { loginUser } from "../DAL/UserAPI";
import useForm from "../useForm";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";

// Components
import InputField from "./InputField";

import "../styles/styles.scss";
import FormBottom from "./FormBottom";
import MyModal from "./MyModal";
import CheckCircleSuccess from "./CheckCircleSuccess";

const Login = () => {
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
    data,
  } = useForm();

  useEffect(() => {
    setValues({ email: "", password: "" });
    return () => setValues({ email: "", password: "" });
  }, [setValues]);

  useEffect(() => {
    if (data && data.accessToken) localStorage.setItem("token",data.accessToken);
  }, [data]);

  useEffect(() => {
    if (data) dispatch(onLogin(data.payload));
  }, [data, dispatch]);

  return (
    <div className="login">
      {!data?.message ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitUser(loginUser);
          }}
          noValidate
        >
          <InputField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            validationErrors={validationErrors.email}
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

          <FormBottom
            btnText="Login"
            loading={loading}
            data={data}
            error={
              error === "Unauthorized - please verify your account" ? (
                <u className="text-primary">
                  <Link to={`/verify/${values.email}`}> Verify your account </Link>
                </u>
              ) : (
                error
              )
            }
          >
            <MyModal data={data}>
              <button className="btn-primary p-2 m-3" onClick={() => history.push("/")}>
                Homepage
              </button>
            </MyModal>
          </FormBottom>
        </form>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <CheckCircleSuccess message={data?.message} />
          <Link to="/" className="btn-primary p-2 m-3">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};
export default Login;
