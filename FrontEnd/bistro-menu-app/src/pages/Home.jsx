
import { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from "../utils/api";

function Home() {
    const [menuItems, setMenuItems] = useState([]); // Store API response
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Handle errors

    useEffect(() => {
        const fetchMenu = async () => {
          try {
            const response = await api.get("/api/menu/menuExrestaurant");
    
            // Ensure data is an array before setting state
            setMenuItems(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
          } catch (err) {
            setError("Failed to fetch menu. Please try again.");
            setLoading(false);
          }
        };
    
        fetchMenu();
      }, []);


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

                {loading && <p>Loading menu...</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="row">
                    {menuItems.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="fw-bold">${item.price}</p>
                                    <button className="btn btn-primary">Order Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </Container>
    );
}

export default Home;