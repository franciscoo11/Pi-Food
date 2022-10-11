import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail';
import Create from './components/Create/Create';


function App() {
  return (
    <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path='/home' component={Home}/>
        <Route exact path="/home/:id" component={Detail} />
        <Route exact path="/recipe" component={Create} />
    </div>
  );
}

export default App;
