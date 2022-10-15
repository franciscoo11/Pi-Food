import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home'
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx';
import CreateRecipe from './components/CreateRecipe/CreateRecipe.jsx';

function App() {
  return (
    <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route exact path='/buildrecipe' component={CreateRecipe} />
        <Route exact path='/recipes/detail/:idRecipe' component={RecipeDetail} />
    </div>
  );
}

export default App;
