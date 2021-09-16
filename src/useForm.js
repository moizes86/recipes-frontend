import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { validationsAPI, validateFields } from "./DAL/validations";
import { useHistory } from "react-router-dom";

export default function useForm() {
  const [values, setValues] = useState({});
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(2);
  const [redirectTo, setRedirectTo] = useState(null);
  const history = useHistory();

  const { sendRequest, loading, data, error, message, Spinner, setMessage } = useFetch();

  useEffect(() => {
    if (data && redirectTo) {
      const myInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      if (countdown === 0) {
        clearInterval(myInterval);
        history.push(redirectTo);
      }
    }

    return () => {};
  }, [data, countdown, values.email, history, redirectTo]);

  const handleBlur = ({ target: { name, value } }) => {
    try {
      name === "confirmPassword" ? validationsAPI[name](value, values.password) : validationsAPI[name](value);
      setErrors({ ...errors, [name]: "" });
    } catch (err) {
      setErrors({ ...errors, [name]: err.message });
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
    setErrors({ ...errors, [inputName]: "" });
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
      setErrors({ ...errors, [isValidForm.key]: isValidForm.message });
      scroll && scrollToError(isValidForm.key);
      return false;
    }

    setErrors({});
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

  const handleSubmitRecipe = async (cb, redirectTo) => {
    if (!validateForm()) return;
    const fd = new FormData();
    for (const image of values.images) fd.append("images", image);
    for (const key in values) if (key !== "images") fd.append(key, JSON.stringify(values[key]));

    await sendRequest(cb, fd);
    setRedirectTo(redirectTo)
  };

  const handleSubmitUser = async (cb, redirectTo) => {
    if (!validateForm(false)) return;
    await sendRequest(cb, values);
    setRedirectTo(redirectTo)
  };

  return {
    values,
    errors,
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
    setMessage,
    images,
    message,
    countdown,
  };
}
