import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Proyectos from './Pages/Proyectos.js';
import Clientes from './Pages/Clientes.js';

function App() {
  return (
    <div>
      <div className="Container">
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Proyectos" exact component={Proyectos} />
              <Route path="/clientes" exact component={Clientes} />
            </Switch>
          </div>
        </Router>
      </div>
      
    </div>
  );
}

export default App;

