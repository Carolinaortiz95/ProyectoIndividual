import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"; //imp
import LandingPage from "./components/LandingPage/landingPage";
import Home from "./components/Home/home";
import RecipeCreate from './components/RecipeCreate/recipeCreate';
import Detail from './components/Detail/detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path='/recipes/:id' component={Detail} />
          <Route path="/recipe" component={RecipeCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
