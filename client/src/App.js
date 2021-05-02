import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import Header from './Header';
import HeaderMain from './HeaderMain';
import FileUpload from './FileUpload';

import {useStateValue} from './StateProvider'

import {auth} from "./firebase";
//import Axios from 'axios';

export default function App() {
   const [{}, dispatch] = useStateValue();
  useEffect(() => {
  //will only run once when the
    auth.onAuthStateChanged(authUser =>{
      //console.log('The User Is >>>>', authUser);

      if (authUser){
        //the user is loged in
        dispatch({
          type:'SET_USER',
          user:authUser
          })
          }else{
            //the User is logged out
            dispatch({
              type:'SET_USER',
              user:null
              })
              }
            })  
          }, []) 
  
  return (
    <Router>
    <div className='container mt-4'>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/'>
        <HeaderMain/>
        <Header/>
        <FileUpload />
     
      </Route>

      </Switch>
    </div>
   
    </Router>
  );
}
