import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={NavBar} />
      <Route exact path='/home/recipes' component={Home} />
      <Route exact path='/home/detail/:id' component={Detail} />
      <Route exact path='/home/create' component={Form} />
    </div>
  );
}

export default App;
