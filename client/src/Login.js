import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  

  return (
    <div className="login">
      <Link to='./' className='text-decoration-none text-center'>
      <h1 className="display-4 text-center mb-5 ">Cloud File</h1>
      </Link>
      <div className="login__container">
          <h1>Sign In</h1>
          <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

            <h5>Password</h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />


            <button type='submit' onClick={signIn} 
            className='login__signInButton'>Sign In</button>
          </form>
          <p>By Signing-in you will be directed to your cloud-file dashboard</p>

          <button onClick={register} className='login__registerButton'>Create your Cloud-File Account</button>
      </div>
    </div>
  )
}

export default Login
