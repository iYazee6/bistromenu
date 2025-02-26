import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';

function NavigationBar() {
    var location = useLocation();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme); // Apply theme to <html>
        localStorage.setItem("theme", theme); // Save theme preference
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className='container-fluid px-0'>
            <div className='col-md-10 col-xl-11'>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Bistro Menu</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto align-bottom">
                                <Nav.Link as={Link} to="/" className={`d-flex align-items-end ${location.pathname === '/' ? 'active' : ''}`} >Menu</Nav.Link>
                                {/* <Nav.Link as={Link} to="/menu">Menu</Nav.Link> */}
                                <Nav.Link as={Link} to="/map" className={location.pathname === '/map' ? 'active' : ''} >Map</Nav.Link>
                                <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className='col-md-2 col-xl-1 d-block d-sm-none'>
                <Form.Check
                    type="switch"
                    id="theme-switch"
                    label={theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                    className="ms-3"
                />
            </div>
        </div>
    );
}

export default NavigationBar;