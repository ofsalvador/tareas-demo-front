import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import TareasPage from "./pages/tareasPage"

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
