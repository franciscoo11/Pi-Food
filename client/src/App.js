import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home.jsx'
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx';
import RecipeCreate from './components/RecipeCreate/RecipeCreate.jsx';
import RecipeUpdate from "./components/RecipeUpdate/RecipeUpdate";

function App() {
  return (
    <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route exact path='/buildrecipe' component={RecipeCreate} />
        <Route exact path='/recipes/detail/:idRecipe' component={RecipeDetail} />
        <Route exact path='/updateRecipe/:idRecipe' component={RecipeUpdate} />
    </div>
  );
}

export default App;
