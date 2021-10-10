import React, { useEffect } from "react";
import "./styles/styles.scss";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import useFetch from "./useFetch";
// Redux
import { doesTokenExists } from "./DAL/UserAPI";
import { useDispatch, useSelector } from "react-redux";

// import App from "./App";
import Navbar from "./components/Navbar";
import RecipePage from "./components/RecipePage";
import RecipeForm from "./components/recipe-form/RecipeForm";
import MyProfile from "./components/MyProfile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyRecipes from "./components/MyRecipes";
import MainPage from "./components/MainPage";
import { onLogin } from "./redux/actions";
import Verify from "./components/Verify";

function App() {
  const dispatch = useDispatch();

  const { sendRequest, data } = useFetch();

  const { activeUser } = useSelector((state) => state);

  useEffect(() => {
    sendRequest(doesTokenExists);
  }, [sendRequest]);

  useEffect(() => {
    if (data) {
      dispatch(onLogin(data.payload));
    }
  }, [data, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="full-height">
          <Navbar />
          <div className="container-md">
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route path="/verify/:email" component={Verify} />
              <Route exact path="/recipes/:id/:title" component={RecipePage} />
              <Route exact path={["/add-recipe", "/edit-recipe/:recipeId"]}>
                {!activeUser ? <Redirect to="/" /> : <RecipeForm />}
              </Route>
              <Route exact path="/my-profile">
                {!activeUser ? <Redirect to="/" /> : <MyProfile />}
              </Route>
              <Route exact path="/my-recipes" component={MyRecipes} />
              <Route exact path="/verify" component={Verify} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
