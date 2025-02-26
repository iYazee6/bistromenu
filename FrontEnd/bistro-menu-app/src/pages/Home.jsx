import { Form, Button, Container } from 'react-bootstrap';

function Home() {
    return (
        <Container className="mt-1">
            <Form>
                <div className='row border search-filter'>
                    <Form.Group controlId="search" className='col-6'>
                        <Form.Control type="Search" className='form-control me-2 boarderless-form' placeholder="Search" />
                    </Form.Group>
                    <div className='col-6 d-flex px-0'>
                        <Form.Group controlId="filter" className="col-10">
                            <Form.Control type="Filter" placeholder="Filter" className='form-control me-2 boarderless-form' />
                        </Form.Group>
                        <Button variant="outline-secondary" className="col-2" type="submit">
                            search
                        </Button>
                    </div>
                </div>
            </Form>
            <div className='row'>




                <h2>Home Page</h2>
            </div>


        </Container>
    );
}

export default Home;