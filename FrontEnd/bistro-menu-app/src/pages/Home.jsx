
import { useState, useEffect } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import api from "../utils/api";
import { FaCoffee, FaInfoCircle, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { GiCroissant } from "react-icons/gi";
import { BiSushi } from "react-icons/bi";
import { TbFiles, TbSoup } from "react-icons/tb";

const categoryIcons = {
    Breakfast: <GiCroissant />,
    Soup: <TbSoup />,
    Sushi: <BiSushi />,
    Drinks: <FaCoffee />,
    Orders: <TbFiles />,
};

function Home() {
    const [menuItems, setMenuItems] = useState([]); // Store API response
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Handle errors
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [cart, setCart] = useState({});


    useEffect(() => {
        const fetchMenu = async () => {
            console.log("🔄 Fetching menu data...");

            try {
                const response = await api.get("api/menu/menuExrestaurant");
                console.log("✅ Menu data received:", response.data);

                const items = Array.isArray(response.data) ? response.data : [];

                const categoryMap = items.reduce((acc, item) => {
                    if (item.category) {
                        acc[item.category] = (acc[item.category] || 0) + 1;
                    }
                    return acc;
                }, {});

                setCategories([{ name: "All", count: items.length }, ...Object.entries(categoryMap).map(([name, count]) => ({ name, count }))]);


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
            // (item.name?.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query))
            (item.itemName?.toLowerCase().includes(query))
        );

        setFilteredItems(filtered);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        filterItems(category, searchQuery);
    };

    const filterItems = (category, query) => {
        let filtered = menuItems;

        if (category !== "All") {
            filtered = filtered.filter(item => item.category === category);
        }

        if (query) {
            filtered = filtered.filter(
                item => item.name?.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query)
            );
        }

        setFilteredItems(filtered);
    };

    const handleShowModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };


    const cartCount = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);
    const totalPrice = Object.entries(cart).reduce((acc, [itemId, quantity]) => {
        const item = menuItems.find((menuItem) => menuItem.id === parseInt(itemId)); // Find item by ID
        return acc + (item ? item.price * quantity : 0); // Multiply price by quantity
      }, 0);

    const addToCart = (item) => {
        setCart((prevCart) => ({
            ...prevCart,
            [item.id]: (prevCart[item.id] || 0) + 1,
        }));
    };
    const removeFromCart = (item) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            if (updatedCart[item.id] > 1) {
                updatedCart[item.id] -= 1;
            } else {
                delete updatedCart[item.id]; // Remove from cart if quantity reaches 0
            }
            return updatedCart;
        });
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
                        <Button variant="outline-secondary" className="col-2 disabled" type="submit">
                            search
                        </Button>
                    </div>
                </div>
            </Form>

            <div className='row my-2'>
                {categories.map((category) => (
                    <div className='col'>
                        <button
                            key={category.name}
                            className={`btn btn-outline-secondary category-btn border-0 me-2 mb-2 ${selectedCategory === category.name ? "selected" : ""}`}
                            onClick={() => handleCategoryClick(category.name)} >
                            <div className="icon-container">
                                {categoryIcons[category.name] || <TbSoup />}
                            </div>
                            <span className="category-text">
                                {category.name} ({category.count})
                            </span>
                        </button>
                    </div>
                ))}

                {cartCount > 0 && (
                    <div className='col border-start'>
                        <button className="btn btn-outline-secondary category-btn border-0 h-100 disabled">
                        <div className="icon-container"><FaShoppingCart /></div> Cart ({cartCount}) 
                            ({totalPrice} SR)
                        </button>
                    </div>
                )}
            </div>


            <div className='row'>
                {loading && <p>Loading ....</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="row">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id} className="col-4 mb-4">
                                <div className="card shadow-sm">
                                    <div className='row g-0'>
                                        <div className='col-md-4 h-100'>
                                            <img src={item.image} className='img-fluid rounded' alt='' />
                                        </div>
                                        <div className='col-md-8'>
                                            <div className="card-body pt-0">
                                                <h5 className="card-title m-0">{item.itemName} <FaInfoCircle className="info-icon" onClick={() => handleShowModal(item)} /></h5>

                                                <p className="h6 text-muted m-0">{item.calorie} calorie</p>
                                                {/* <p className="card-text">{item.description}</p> */}
                                                <p className="fw-bold m-0">{item.price} SR</p>
                                                {/* <button className="btn btn-primary">Order Now</button> */}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <button className="btn btn-danger bg-theme border-0 btn-sm me-2" onClick={() => removeFromCart(item)}>
                                                    <FaMinus />
                                                </button>
                                                <span className="cart-quantity">{cart[item.id] || 0}</span>
                                                <button className="btn btn-success bg-theme border-0 btn-sm ms-2" onClick={() => addToCart(item)}>
                                                    <FaPlus />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && <p>No menu item found.</p>
                    )}

                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        {selectedItem && (
                            <>
                                <Modal.Header closeButton className='border-bottom-0'>
                                    <Modal.Title>
                                        {selectedItem.itemName}
                                        <p className="text-muted h6 mb-0">{selectedItem.calorie} calorie</p>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className='text-muted'>{selectedItem.description}</p>
                                    <img src={selectedItem.image || "https://via.placeholder.com/400"} alt={selectedItem.name} className="img-fluid rounded mb-3" />
                                </Modal.Body>
                                <Modal.Footer>
                                    {/* <Button variant="secondary" onClick={handleCloseModal}>
                                        Close
                                    </Button> */}
                                    <span className='text-theme-color'>
                                        {selectedItem.price} SR
                                    </span>

                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-danger bg-theme btn-sm me-2" onClick={() => removeFromCart(selectedItem)}>
                                            <FaMinus />
                                        </button>
                                        <span className="cart-quantity">{cart[selectedItem.id] || 0}</span>
                                        <button className="btn btn-success bg-theme btn-sm ms-2" onClick={() => addToCart(selectedItem)}>
                                            <FaPlus />
                                        </button>
                                    </div>

                                </Modal.Footer>
                            </>
                        )}
                    </Modal>

                </div>

            </div>


        </Container>
    );
}

export default Home;