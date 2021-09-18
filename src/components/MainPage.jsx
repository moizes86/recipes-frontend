import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onSetRecipes } from "../redux/actions";
import { getRecipes } from "../DAL/RecipeAPI";
import useFetch from "../useFetch";

// Components
import Gallery from "./Gallery";
import Jumbotron from "./Jumbotron";
import Search from "./Search";

const MainPage = () => {
  const dispatch = useDispatch();
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  useEffect(() => {
    (async () => {
      await sendRequest(getRecipes);
    })();
  }, [sendRequest]);

  useEffect(() => {
    if (data) dispatch(onSetRecipes(data.payload));
  }, [data, dispatch]);

  return (
    <div className="main-page">
      <div className="full-height">
        <Search />
        <Jumbotron />
      </div>

      {loading ? <Spinner /> : <Gallery />}
      {error && <small>{error}</small>}
    </div>
  );
};

export default MainPage;
