import React, { useEffect } from "react";
import { verify } from "../DAL/UserAPI";
import { useParams } from "react-router-dom";
import useForm from "../useForm";
import InputField from "./InputField";
import FormBottom from "./FormBottom";
import MyModal from "./MyModal";
import { Link } from "react-router-dom";

export default function Verify() {
  const { handleSubmitUser, handleChange, setValues, values, loading, data, error, validationErrors } =
    useForm();
  const { email } = useParams();

  useEffect(() => {
    setValues({ email, code: "" });
  }, [setValues, email]);

  return (
    <div className="container col-sm-7 col-md-6 col-lg-5 col-xl-4 my-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitUser(verify, { email, code: values.code });
        }}
      >
        <InputField
          type="number"
          label="Code:"
          placeholder="Enter code..."
          name="code"
          id="code"
          value={values.code}
          handleChange={handleChange}
          shrinkLabel={false}
          validationErrors={validationErrors.code}
        />

        <FormBottom loading={loading} data={data} error={error} btnText="Verify">
          {data && (
            <MyModal data={data}>
              <p className="text-center p-2">
                <Link to="/login">
                  <u className="text-primary">Login</u>
                </Link>
              </p>
            </MyModal>
          )}
        </FormBottom>
      </form>
    </div>
  );
}
