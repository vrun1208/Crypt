import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import page0 from './components/table'
import page1 from './components/coinpage'
import page2 from './components/news'
import NavBar from './components/nav'
import Footer from './components/footer';


function App() {
  return (
    <div className="App">
      
      <Router>
      <NavBar />
        <Switch>
          <Route exact path="/" component={page0} />
          <Route exact path="/coin/:id" component={page1} />
          <Route exact path="/news" component={page2} />
        </Switch>  
        <Footer />
      </Router>
    </div>
  );
}

export default App;
