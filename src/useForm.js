import { useState } from "react";
import useFetch from "./useFetch";
import { validationsAPI, validateFields } from "./DAL/validations";

export default function useForm() {
  const [values, setValues] = useState({});
  const [images, setImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const { sendRequest, loading, data, error, requestMade, Spinner } = useFetch();

 

  const handleBlur = ({ target: { name, value } }) => {
    try {
      name === "confirmPassword" ? validationsAPI[name](value, values.password) : validationsAPI[name](value);
      setValidationErrors({ ...validationErrors, [name]: "" });
    } catch (err) {
      setValidationErrors({ ...validationErrors, [name]: err.message });
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheck = ({ target: { name, checked, id, value } }) => {
    if (checked) {
      if (!values[name]) values[name] = [];
      values[name].push(value);
    } else {
      values[name] = values[name].filter((item) => item !== value);
    }
    setValues({ ...values });
  };

  const addItem = (item, inputName) => {
    if (!values[inputName]) values[inputName] = [];
    values[inputName].push(item);
    setValues({ ...values });
    setValidationErrors({ ...validationErrors, [inputName]: "" });
  };

  const removeItem = ({
    target: {
      title,
      id,
      attributes: { text },
    },
  }) => {
    const index = values[title].findIndex((el) => el.title === title.value);
    values[title].splice(index, 1);
    if (!values[title + "Deleted"]) values[title + "Deleted"] = [];

    values[title + "Deleted"].push(id);
    setValues({ ...values });
  };

  const validateForm = (scroll) => {
    const isValidForm = validateFields(values);
    if (isValidForm !== true) {
      setValidationErrors({ ...validationErrors, [isValidForm.key]: isValidForm.message });
      scroll && scrollToError(isValidForm.key);
      return false;
    }

    setValidationErrors({});
    return true;
  };

  const scrollToError = (e) => {
    // Toggle class  'show' where error has occured to enable scrolling
    let targetEl = document.querySelector(`.accordion #${e}`);
    while (!Array.from(targetEl.classList).includes("collapse")) {
      targetEl = targetEl.parentElement;
    }
    if (!Array.from(targetEl.classList).includes("show")) targetEl.classList.toggle("show");
    document.querySelector(`#${e}`).scrollIntoView({ behavior: "smooth", block: "center" }); // scroll to element
  };

  const handleSubmitRecipe = async (cb) => {
    if (!validateForm(true)) return;
    const fd = new FormData();
    for (const image of values.images) fd.append("images", image);
    for (const key in values) if (key !== "images") fd.append(key, JSON.stringify(values[key]));
    await sendRequest(cb, fd);
  };

  const handleSubmitUser = async (cb) => {
    if (!validateForm(false)) return;
    await sendRequest(cb, values);
    // setRedirectTo(redirectTo)
  };

  return {
    values,
    validationErrors,
    addItem,
    removeItem,
    handleBlur,
    handleChange,
    handleCheck,
    handleSubmitRecipe,
    handleSubmitUser,
    sendRequest,
    loading,
    data,
    error,
    Spinner,
    setImages,
    setValues,
    images,
    requestMade
  };
}
