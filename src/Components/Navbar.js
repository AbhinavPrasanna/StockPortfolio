import React, { useEffect, useState } from 'react'

import '../Stylesheets/Navbar.css';
import '../Stylesheets/Buttons.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Auth } from 'aws-amplify';

function Navbar() {
    const {authUser,setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const hidden = { display : "none" };
    const visible = { display : "block" };

    const [searchWord, setSearchWord] = useState("");
    const [signUpView, setSignUpView] = useState(visible);
    const [loginView, setLoginView] = useState(hidden);

    useEffect(() => {
        console.log("useEffect");
        if(searchWord !== "" && searchWord) {
            navigate("/search",{state: {searchWord: searchWord}})
        }
    }, [searchWord])
 
    const handleSearch = (e) => {
        if(e.target.value !== '' && e.target.value) {
            setSearchWord(e.target.value);
        }
    }

    const handleLogout = (e) =>{
      Auth.signOut().then(() => {
        setIsLoggedIn(false);
        setSignUpView(visible);
        setLoginView(hidden);
      }
        ).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div class="bar">
            <nav class="navbar navbar-expand-lg">
                <span class="navbar-brand ms-3">
                    <button class="nav-item LogoTypography TransparentButton" onClick = {() => navigate("/")}>Cards</button>
                </span>
                <div class="collapse navbar-collapse ms-5">
                    <button class="nav-item TransparentButton2 TabText" onClick={() => navigate("/bank")}>Banks</button>
                    <button class="nav-item TransparentButton2 TabText ms-5" onClick={() => navigate("/cards")}>Cards</button>
                    <button class="nav-item TransparentButton2 TabText ms-5" onClick={() => navigate("/ratings")}>Ranked</button>
                    <button class="nav-item TransparentButton2 TabText ms-5" onClick={() => navigate("/forms")}>Forms</button>
                    <input class="nav-item TransparentButton2 TabText" onChange={handleSearch}placeholder="Search"/>
                </div>
                {
                    isLoggedIn 
                    ?
                    <button class="nav-item SignUpButtonLayout SignUpText me-5" onClick={handleLogout}>Logout</button>
                    :
                    <div>
                        <button class="nav-item SignUpButtonLayout SignUpText me-5" onClick={() => navigate("/signup") }>Sign Up</button>
                        <button class="nav-item TransparentButton2 TabText me-5" onClick={() => navigate("/login")}>Login</button>
                    </div>

                }
                
            </nav>
        </div>
    )
}

export default Navbar
