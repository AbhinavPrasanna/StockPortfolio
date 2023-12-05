import React from 'react'

import '../Stylesheets/Navbar.css';
import '../Stylesheets/Buttons.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    return (
        <div class="bar">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand ms-3">
                    <button class="nav-item LogoTypography TransparentButton" onClick = {() => navigate("/")}>Cards</button>
                </a>
                <div class="collapse navbar-collapse ms-5">
                    <button class="nav-item TransparentButton2 TabText" onClick={() => navigate("/bank")}>Banks</button>
                    <button class="nav-item TransparentButton2 TabText ms-5" onClick={() => navigate("/cards")}>Cards</button>
                    <button class="nav-item TransparentButton2 TabText ms-5" onClick={() => navigate("/ratings")}>Ranked</button>
                    <input class="nav-item TransparentButton2 TabText" onClick={() => navigate("/search")}placeholder="Search"/>
                </div>
                <button class="nav-item SignUpButtonLayout SignUpText me-5" onClick={() => navigate("/signup") }>Sign Up</button>
                <button class="nav-item TransparentButton2 TabText me-5" onClick={() => navigate("/login")}>Login</button>
            </nav>
        </div>
    )
}

export default Navbar