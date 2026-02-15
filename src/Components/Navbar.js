import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAuth } from '../Contexts/AuthContext';
import '../Stylesheets/Navbar.css';
import '../Stylesheets/Buttons.css';

function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        if (searchWord !== "" && searchWord) {
            navigate("/search", { state: { searchWord: searchWord } });
        }
    }, [searchWord, navigate]);
 
    const handleSearch = (e) => {
        if (e.target.value !== '' && e.target.value) {
            setSearchWord(e.target.value);
        }
    };

    const handleLogout = () => {
      Auth.signOut().then(() => {
        setIsLoggedIn(false);
      }
        ).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="Bar">
            <BootstrapNavbar expand="lg" className="py-2">
                <Container fluid>
                    <BootstrapNavbar.Brand>
                        <button className="TransparentButton brand-button" onClick={() => navigate("/")}>
                            <span className="brand-mark">C</span>
                            <span className="LogoTypography">Cards</span>
                        </button>
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" />
                    <BootstrapNavbar.Collapse id="main-navbar-nav">
                        <Nav className="ms-lg-4 gap-lg-3 align-items-lg-center w-100">
                            <button className="TransparentButton2 navbar-link-text" onClick={() => navigate("/bank")}>Banks</button>
                            <button className="TransparentButton2 navbar-link-text" onClick={() => navigate("/cards")}>Cards</button>
                            <button className="TransparentButton2 navbar-link-text" onClick={() => navigate("/ratings")}>Ranked</button>
                            <button className="TransparentButton2 navbar-link-text" onClick={() => navigate("/articles")}>Articles</button>
                            <Form className="ms-lg-3">
                                <FormControl
                                    className="navbar-search navbar-link-text"
                                    placeholder="Search"
                                    aria-label="Search cards"
                                    onChange={handleSearch}
                                />
                            </Form>
                            <div className="ms-lg-auto d-flex align-items-center gap-2">
                                {isLoggedIn ? (
                                    <Button className="navbar-auth-text navbar-signup-btn" onClick={handleLogout}>Logout</Button>
                                ) : (
                                    <>
                                        <Button className="navbar-auth-text navbar-signup-btn" onClick={() => navigate("/signup")}>Sign Up</Button>
                                        <Button className="navbar-auth-text navbar-login-btn" onClick={() => navigate("/login")}>Login</Button>
                                    </>
                                )}
                            </div>
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        </div>
    );
}

export default Navbar;
