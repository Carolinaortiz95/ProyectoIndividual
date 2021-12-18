import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"; //imp
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = "/" component = {LandingPage}/>
        <Route path = "/home" component = {Home}/>
        <Route path= '/recipes/:id' component= {Detail}/>
        <Route path = "/recipe" component = {RecipeCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
