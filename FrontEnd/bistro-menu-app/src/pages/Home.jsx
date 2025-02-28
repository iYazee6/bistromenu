
import { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from "../utils/api";

function Home() {
    const [menuItems, setMenuItems] = useState([]); // Store API response
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Handle errors
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMenu = async () => {
            console.log("🔄 Fetching menu data...");

            try {
                const response = await api.get("api/menu/menuExrestaurant");
                console.log("✅ Menu data received:", response.data);

                const items = Array.isArray(response.data) ? response.data : [];
                setMenuItems(items);
                setFilteredItems(items); // Initially, show all items
                setLoading(false);
            } catch (err) {
                console.error("❌ Failed to fetch menu:", err);
                setError("Failed to load menu. Please try again.");
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Ensure filtering doesn't break if name or description is null
        const filtered = menuItems.filter((item) =>
            (item.name?.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query))
        );

        setFilteredItems(filtered);
    };

    return (
        <Container className="mt-1">
            <Form>
                <div className='row border search-filter'>
                    <div className='col-6'>
                        <input type="text" className="form-control me-2 boarderless-form" placeholder="Search ...." value={searchQuery} onChange={handleSearch} />
                    </div>
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
                <div className='col'>
                    <div className="mb-4">
                    </div>
                </div>
            </div>
            <div className='row'>
                {loading && <p>Loading menu...</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="row">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
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
                        ))
                    ) : (
                        !loading && <p>No matching menu items found.</p>
                    )}

                </div>

            </div>


        </Container>
    );
}

export default Home;