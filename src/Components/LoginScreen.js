import React, {useState} from 'react'
import { useAuth } from '../Contexts/AuthContext';
import {Auth} from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

import {validEmail} from '../Utils/Regex';

function LoginScreen() {
  const {setAuthUser,setIsLoggedIn} = useAuth();
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("Must be 8 Characters Long. Contains at least 1 number. Contains at least 1 special character. Contains at least 1 uppercase letter. Contains at least 1 lowercase letter.");

  const handleEmailChange = (e) => {
    if(validEmail.test(e.target.value)) {
        setEmail(e.target.value);
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const login = (e) => {
    Auth.signIn(email,password).then(() => {
      setIsLoggedIn(true);
      navigate("/");
    }
    ).catch((error) => {
      setMessage(error.message);
    });
  }

  return (
    <div class="container-md">
      <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailChange}/>
      <small id="emailHelp" class="form-text text-muted">Must be a proper email</small>
     </div>
     <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlePasswordChange}/>
      <small id="passwordHelp" class="form-text text-muted">{message}</small>
     </div>
     <button type="submit" class="btn btn-primary" onClick={login}>Submit</button>
    </div>
  )
}

export default LoginScreen
