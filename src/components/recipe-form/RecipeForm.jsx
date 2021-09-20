import React, { useState, useEffect } from "react";

import useForm from "../../useForm";
import { useLocation, useParams, useHistory, Link } from "react-router-dom";

import { getOptions, addRecipe, editRecipe, getRecipe } from "../../DAL/RecipeAPI";

import { useSelector } from "react-redux";

import AccordionCardHeader from "./AccordionCardHeader";
import InputField from "../InputField";
import InputCheckbox from "../InputCheckbox";
import FormBottom from "../FormBottom";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import ImageUpload from "./ImageUpload";
import MyModal from "../MyModal";

export default function RecipeForm() {
  const [options, setOptions] = useState({});
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const {activeUser} = useSelector(state=>state);

  const {
    values,
    validationErrors,
    addItem,
    removeItem,
    handleBlur,
    handleChange,
    handleCheck,
    handleSubmitRecipe,
    loading,
    data,
    error,
    setValues,
    sendRequest,
    message,
    Spinner,
    setMessage,
  } = useForm();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("options")) {
        const { data } = await getOptions();
        localStorage.setItem("options", JSON.stringify(data.payload));
      }
      return setOptions(JSON.parse(localStorage.getItem("options")));
    })();
  }, []);

  useEffect(() => {
    if (location.pathname === "/add-recipe") {
      setValues({
        email: activeUser.email,
        title: "",
        source: "",
        source_url: "",
        images: [],
        description: "",
        dietsSelected: [],
        categoriesSelected: [],
        ingredients: [],
        instructions: [],
        cook: 0,
        servings: 0,
      });

      if (message) setMessage(null);
    } else {
      const { recipeId } = params;
      sendRequest(getRecipe, recipeId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, params, setValues, sendRequest]);

  useEffect(() => {
    if (data) {
      setValues(data.payload);
    }
  }, [data, setValues]);

  return (
    <div>
      {loading && !data ? (
        <Spinner />
      ) : (
        <form
          className="recipe-form "
          onSubmit={(e) => {
            e.preventDefault();
            if (location.pathname === "/add-recipe") {
              handleSubmitRecipe(addRecipe);
            } else {
              handleSubmitRecipe(editRecipe);
            }
          }}
        >
          <div className="accordion" id="accordionExample">
            <div className="card">
              <AccordionCardHeader
                text="General Details"
                id="headingOne"
                target="#generalDetails"
                controls="collapseOne"
              />

              <div id="generalDetails" className="collapse show">
                <div className="card-body">
                  <div className="form-row">
                    <InputField
                      label="* Recipe name (title)"
                      name="title"
                      type="text"
                      placeholder="Enter recipe name"
                      value={values.title}
                      validationErrors={validationErrors.title}
                      shrinkLabel={false}
                      classes="font-bolder pl-0"
                      cols="col col-md-6"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />

                    <InputField
                      label="Source"
                      name="source"
                      type="text"
                      placeholder="Where is this from?"
                      value={values.source}
                      shrinkLabel={false}
                      classes="font-bolder  pl-0"
                      cols="col-12 col-md-6"
                      handleChange={handleChange}
                    />
                  </div>

                  <InputField
                    label="Link To Source"
                    name="source_url"
                    type="text"
                    placeholder="Enter a valid link"
                    value={values.source_url}
                    validationErrors={validationErrors.source_url}
                    shrinkLabel={false}
                    classes="font-bolder col col-md-6 pl-0"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <div className="form-group">
                    <label className="form-label font-bolder" htmlFor="description">
                      * General description, will be presented below the title
                    </label>
                    <textarea
                      className="form-control "
                      id="description"
                      name="description"
                      value={values.description}
                      rows="3"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    <small>{validationErrors.description}</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <AccordionCardHeader text="Options" id="headingTwo" target="#options" />
              <div id="options" className="collapse">
                <div className="card-body">
                  <InputCheckbox
                    checkboxGroupTitle="Diets:"
                    inputName="dietsSelected"
                    items={options.diets}
                    itemsSelected={values.dietsSelected}
                    handleCheck={handleCheck}
                  />

                  <div className="my-2"></div>
                  <InputCheckbox
                    checkboxGroupTitle="Categories:"
                    inputName="categoriesSelected"
                    items={options.categories}
                    itemsSelected={values.categoriesSelected}
                    handleCheck={handleCheck}
                  />

                  <div className="form-row  mt-3">
                    <InputField
                      label="Cook"
                      name="cook"
                      type="number"
                      value={values.cook}
                      validationErrors={validationErrors.cook}
                      shrinkLabel={false}
                      classes="font-bolder"
                      cols="col col-md-3 mr-4"
                      handleChange={handleChange}
                    />

                    <InputField
                      label="Servings"
                      name="servings"
                      type="number"
                      value={values.servings}
                      validationErrors={validationErrors.servings}
                      max={10}
                      required={false}
                      shrinkLabel={false}
                      classes="font-bolder"
                      cols="col col-md-3"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <AccordionCardHeader text="Ingredients" id="headingThree" target="#ingredients" />
              <div id="ingredients" className="collapse" aria-labelledby="headingThree">
                <div className="card-body">
                  <IngredientsSection
                    measuringUnits={options.measuringUnits}
                    ingredients={values.ingredients}
                    submitError={validationErrors.ingredients}
                    addItem={addItem}
                    removeItem={removeItem}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <AccordionCardHeader
                text="Instructions"
                id="headingFour"
                target="#instructions"
                expanded={false}
              />
              <div id="instructions" className="collapse">
                <div className="card-body">
                  <InstructionsSection
                    instructions={values.instructions}
                    addItem={addItem}
                    removeItem={removeItem}
                    submitError={validationErrors.instructions}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <AccordionCardHeader text="Images" id="headingFive" target="#images" expanded={false} />
              <div id="images" className="collapse">
                <div className="card-body">
                  <ImageUpload
                    handleChange={handleChange}
                    images={values.images}
                    validationErrors={validationErrors.images}
                  />
                </div>
              </div>
            </div>
          </div>
          <FormBottom
            btnText={location.pathname === "/add-recipe" ? "Add Recipe" : "Save"}
            loading={loading}
            error={error}
          >
            {data?.message && (
              <MyModal data={data}>
                <div className="d-flex flex-column align-items-center">
                  <Link to={`/recipes/${data.payload.id}/${data.payload.title}`}>
                    <u className="text-primary">View Recipe</u>
                  </Link>{" "}
                </div>
                <button className="btn-primary p-2 m-3" onClick={() => history.push("/")}>
                  Homepage
                </button>
              </MyModal>
            )}
          </FormBottom>
        </form>
      )}
    </div>
  );
}
