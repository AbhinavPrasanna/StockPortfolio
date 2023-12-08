import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../Contexts/AuthContext'
import {Auth} from 'aws-amplify'
import {User} from '../Components/User'

import {validEmail, validFirstName, validLastName} from '../Utils/Regex';

function SignUpScreen() {
  const [email,setEmail] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [password,setPassword] = useState("");
  const[isValidForm,setIsValidForm] = useState(false);
  const [ButtonStyle,setButtonStyle] = useState(hidden);
  const [ButtonOpacity,setButtonOpacity] = useState(opacity);

  const hidden = { visibility : 'hidden' };
  const visible = { visibility : 'visible' };
  const opacity = { opacity : 0.5 };
  const opacityvisible = { opacity : 1 };

  useEffect(() => {
    if(validEmail.test(email) && validFirstName.test(firstName) && validLastName.test(lastName)) {
      setIsValidForm(true);
    }
  },[email,firstName,lastName,password]);

  const handleEmailChange = (e) => {
    if(validEmail.test(e.target.value)) {
        setEmail(e.target.value);
    }
  }
  const handleFirstNameChange = (e) => {
    if(validFirstName.test(e.target.value)) {
      setFirstName(e.target.value);
    }
  }
  const handleLastNameChange = (e) => {
    if(validLastName.test(e.target.value)) {
      setLastName(e.target.value);
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div class="container-lg">
     <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailChange}/>
      <small id="emailHelp" class="form-text text-muted">Must be a proper email</small>
     </div>
     <div class="form-group">
      <label for="exampleInputFirstName1">First Name</label>
      <input type="text" class="form-control" id="exampleInputFirstName1" onChange={handleFirstNameChange}/>
     </div>
     <div class="form-group">
      <label for="exampleInputLastName1">Last Name</label>
      <input type="text" class="form-control" id="exampleInputLastName1" onChange={handleLastNameChange} />
     </div>
     <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlePasswordChange}/>
      <small id="passwordHelp" class="form-text text-muted">Must be 8 Characters Long. Contains at least 1 number. Contains at least 1 special character. Contains at least 1 uppercase letter. Contains at least 1 lowercase letter.</small>
     </div>
     <button type="submit" class="btn btn-primary" >Submit</button>
    </div>
  )
}

export default SignUpScreen