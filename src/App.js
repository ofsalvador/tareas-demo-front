import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import TareasPage from "./pages/tareasPage"
import { Provider } from 'react-redux';
//import { createBrowserHistory } from 'history';

//const history = createBrowserHistory();

function App() {

  return (
    <Router>
      <Switch>         
        <Route path="/">
          <TareasPage />
        </Route>
      </Switch>
    </Router>    
  );
}

export default App;
