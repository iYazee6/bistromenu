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
        <div className='d-flex'>
            <div className='nav-container col-md-10 col-lg-11 text-center h-100'>
                <Navbar bg="dark" variant="dark" expand="lg" className="h-100">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">Bistro Menu</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto align-bottom">
                                <Nav.Link as={Link} to="/" className={`d-flex align-items-end ${location.pathname === '/' ? 'active' : ''}`} >Menu</Nav.Link>
                                {/* <Nav.Link as={Link} to="/menu">Menu</Nav.Link> */}
                                <Nav.Link as={Link} to="/map" className={location.pathname === '/map' ? 'active' : ''} >Map</Nav.Link>
                                {/* <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div className="theme-toggle-container col-md-2 col-lg-1">
                <Form.Check
                    type="switch"
                    id="theme-switch"
                    label=""
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                    className="theme-switch"
                />
                <span className="theme-label">{theme === "light" ? "🌙" : "☀️"}</span>
            </div>

        </div>
    );
}

export default NavigationBar;