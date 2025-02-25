import { Form, Button, Container } from 'react-bootstrap';

function Login() {
  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" className="mt-3" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;