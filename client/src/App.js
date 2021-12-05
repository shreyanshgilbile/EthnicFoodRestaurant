import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import SlideDiv from './components/SlideDiv';
import Menu from './components/Menu';
import MyOrders from './components/MyOrders';
import About from './components/About';
import Contact from './components/Contact';
import { loadUser } from "./actions";
import {BrowserRouter as Router, Route}  from 'react-router-dom';

  
function App() {
  
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser(dispatch, token);  
  }, []);

  return (
    <Router>
     <div className="App">
     <Route exact path='/' render={ () => (
       <React.Fragment>
         <AppNavbar />
         <SlideDiv />
         <About />
         <Contact />
       </React.Fragment> 
     )} />
         <Route path="/Menu" render={ () => (
           <React.Fragment>
             <AppNavbar />
             <Menu />
             <Contact /> 
           </React.Fragment>
         )} />
         <Route path="/Orders" render={ () => (
           <React.Fragment>
             <AppNavbar />
             <MyOrders />
             <Contact /> 
           </React.Fragment>
         )} />       
     </div>
   </Router>
  );
}

export default App;

