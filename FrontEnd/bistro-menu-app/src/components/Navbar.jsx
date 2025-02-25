import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavigationBar() {
    var location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Bistro Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto align-bottom">
                        <Nav.Link as={Link} to="/" className={`d-flex align-items-end ${ location.pathname === '/' ? 'active' : ''}` } >Menu</Nav.Link>
                        {/* <Nav.Link as={Link} to="/menu">Menu</Nav.Link> */}
                        <Nav.Link as={Link} to="/map" className={location.pathname === '/map' ? 'active' : ''} >Map</Nav.Link>
                        <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
                        <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;