import { Form, Button, Container } from 'react-bootstrap';

function Register() {
  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="success" className="mt-3" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;