import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Auth} from 'aws-amplify'
import { useAuth } from '../Contexts/AuthContext'
import User from '../Components/Users'


import {validEmail, validFirstName, validLastName} from '../Utils/Regex';

function SignUpScreen() {
  const {setAuthUser,setIsLoggedIn} = useAuth();
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [password,setPassword] = useState("");
  const [code,setCode] = useState("");

  const [isValidEmail,setIsValidEmail] = useState(false);
  const [isValidFirstName,setIsValidFirstName] = useState(false);
  const [isValidLastName,setIsValidLastName] = useState(false);


  const [passwordMessage,setPasswordMessage] = useState("Must be 8 Characters Long. Contains at least 1 number. Contains at least 1 special character. Contains at least 1 uppercase letter. Contains at least 1 lowercase letter.");
  const [codeMessage,setCodeMessage] = useState("Verification Code sent through email");

  const[isValidForm,setIsValidForm] = useState(false);

  const opacity = { opacity : 0.5 };
  const opacityvisible = { opacity : 1 };
  const hidden = { display : "none" };
  const visible = { display : "block" };

  const [TextVisible,setTextVisible] = useState(visible);
  const [CodeTextVisible,setCodeTextVisible] = useState(hidden);

  const [ButtonOpacity,setButtonOpacity] = useState(opacity);
  const [isCodeActive , setIsCodeActive] = useState(false);

  useEffect(() => {
    if(isValidEmail && isValidFirstName && isValidLastName) {
      setIsValidForm(true);
      setButtonOpacity(opacityvisible);
    }
  },[email,firstName,lastName,password,code]);

  const handleEmailChange = (e) => {
    if(validEmail.test(e.target.value)) {
        setIsValidEmail(true);
        setEmail(e.target.value);
    }
  }
  const handleFirstNameChange = (e) => {
    if(validFirstName.test(e.target.value)) {
      setIsValidFirstName(true);
      setFirstName(e.target.value);
    }
  }
  const handleLastNameChange = (e) => {
    if(validLastName.test(e.target.value)) {
      setIsValidLastName(true);
      setLastName(e.target.value);
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleCode = (e) => {
    setCode(e.target.value);
  }

  const signUpUser = (e) => {
    console.log("Signing Up User");
    Auth.signUp({'username':email,'password':password}).
    then (()=>{
      console.log("User Created");
      setIsCodeActive(true);
      setAuthUser(new User(email,firstName,lastName,false));
      setTextVisible(hidden);
      setCodeTextVisible(visible);
    })
    .catch((error)=>{
      console.log(error);
      setPasswordMessage(error.message);
    })
  }

  const confirm = (e) => {
    Auth.confirmSignUp(email,code)
    .then(()=>{
      navigate('/');
      setIsLoggedIn(true);
    })
    .catch((error)=>{
      console.log(error);
      setCodeMessage(error.message);
    })
  }

  const handleButtonClick = (e) => {
    console.log("Button Clicked")
    if(!isCodeActive){
       signUpUser(e);
    }
    else{
      confirm(e);
    }
  }


  return (
    <div class="container-lg">
     <div class="form-group">
      <label for="exampleInputEmail1" style={TextVisible}>Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailChange} style={TextVisible}/>
     </div>
     <div class="form-group">
      <label for="exampleInputFirstName1" style={TextVisible}>First Name</label>
      <input type="text" class="form-control" id="exampleInputFirstName1" onChange={handleFirstNameChange} style={TextVisible}/>
     </div>
     <div class="form-group">
      <label for="exampleInputLastName1" style={TextVisible}>Last Name</label>
      <input type="text" class="form-control" id="exampleInputLastName1" onChange={handleLastNameChange} style={TextVisible}/>
     </div>
     <div class="form-group">
      <label for="exampleInputPassword1" style={TextVisible}>Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlePasswordChange} style={TextVisible}/>
      <small id="passwordHelp" class="form-text text-muted" style={TextVisible}>{passwordMessage}</small>
     </div>
     <div class="form-group">
      <label for="exampleInputEmail" style={CodeTextVisible}>Verification Code</label>
      <input type="text" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" style={CodeTextVisible} onChange={handleCode}/>
      <small id="emailHelp" class="form-text text-muted" style={CodeTextVisible}>{codeMessage}</small>
     </div>
     <button type="submit" class="btn btn-primary" disabled={!isValidForm} style={ButtonOpacity} onClick={handleButtonClick}>Submit</button>
    </div>
  )
}

export default SignUpScreen
