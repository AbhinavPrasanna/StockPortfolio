import React, { useEffect, useState } from 'react'

import '../Stylesheets/Navbar.css';
import '../Stylesheets/Buttons.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState("");
    useEffect(() => {
        if(searchWord !== "" && searchWord) {
            navigate("/search",{state: {searchWord: searchWord}})
        }
    }, [searchWord])
 
    const handleSearch = (e) => {
        if(e.target.value !== '' && e.target.value) {
            setSearchWord(e.target.value);
        }
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
                    <input class="nav-item TransparentButton2 TabText" onChange={handleSearch}placeholder="Search"/>
                </div>
                <button class="nav-item SignUpButtonLayout SignUpText me-5" onClick={() => navigate("/signup") }>Sign Up</button>
                <button class="nav-item TransparentButton2 TabText me-5" onClick={() => navigate("/login")}>Login</button>
            </nav>
        </div>
    )
}

export default Navbar