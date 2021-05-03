import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from './Login';

import FileUpload from './FileUpload';
import {useStateValue} from './StateProvider'
import {auth} from "./firebase";
import firebase from './firebase'
//import Axios from 'axios';

export default function App() {
  
   const [{}, dispatch] = useStateValue();

// async function handleLogout() {
//   await Auth.signOut();
//   userHasAuthenticated(false);
//   history.push("/login");
// }
// if (!auth.currentUser){
//   history.push('/login')
// }



  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      if (authUser){ 

        dispatch({
          type:'SET_USER',
          user:authUser
          })

          }else{
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
        <Route exact path='/login' component={Login}/>
        
        <Route exact path='/' component={FileUpload}/>
       
      </Switch>
    </div>
   
    </Router>
  );
}
