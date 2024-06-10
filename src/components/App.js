import React, { useState, useEffect } from 'react';
import '.././App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [jumlahBayar, setJumlahBayar] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showPaymentAmountInput, setShowPaymentAmountInput] = useState(true);

    // Listen for resize event to adjust popup position
    useEffect(() => {
        function handleResize() {
            const popup = document.querySelector('.popup-overlay');
            if (popup) {
                popup.style.top = `${window.innerHeight / 2 - popup.offsetHeight / 2}px`;
            }
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuItems = [
        { id: 1, name: "Mi Sup", price: 5, category: "Mi Sup" },
        { id: 2, name: "Nasi Air", price: 6, category: "Mi Sup" },
        { id: 3, name: "Mi Sup 1/2", price: 3, category: "Mi Sup" },
        { id: 4, name: "Kayu Kamat", price: 0.6, category: "Makanan Pagi" },
        { id: 5, name: "Teh O", price: 1, category: "Minuman" },
        { id: 6, name: "Teh O Peng", price: 2, category: "Minuman" },
        { id: 7, name: "Teh Tarik", price: 2, category: "Minuman" },
        { id: 8, name: "Teh Peng", price: 2.5, category: "Minuman" },
        { id: 9, name: "Milo", price: 2.5, category: "Minuman" },
        { id: 10, name: "Milo Peng", price: 3.5, category: "Minuman" },
        { id: 11, name: "Nes O", price: 2, category: "Minuman" },
        { id: 12, name: "Nes O Peng", price: 2.5, category: "Minuman" },
        { id: 13, name: "Keladi/Jagung/Pisang Peng", price: 2.5, category: "Minuman" },
        // Add more items as needed
    ];

    const categories = ["Minuman", "Mi Sup", "Makanan Pagi"];

    const filteredItemsByCategory = (category) => {
        return menuItems.filter(item => item.category === category);
    };

    const addItem = (item) => {
        const itemIndex = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
        if (itemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[itemIndex].quantity++;
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
        }
    };

    const removeItem = (item) => {
        const updatedItems = [...selectedItems];
        const itemIndex = updatedItems.findIndex((selectedItem) => selectedItem.id === item.id);
        if (itemIndex !== -1) {
            if (updatedItems[itemIndex].quantity > 1) {
                updatedItems[itemIndex].quantity--;
            } else {
                updatedItems.splice(itemIndex, 1);
            }
            setSelectedItems(updatedItems);
        }
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleBayar = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleJumlahBayarChange = (event) => {
        setJumlahBayar(event.target.value);
    };

    const calculateBaki = () => {
        return jumlahBayar - calculateTotal();
    };

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h2>Kira Bil</h2>
                        {/* Display selected items */}
                        {selectedItems.map((item) => (
                            <div key={item.id} className="selected-item">
                                <div>{item.name} x  <span>{item.quantity}</span></div>
                                <div>{(item.price * item.quantity).toFixed(2)}  <button type="button" className="btn btn-warning" onClick={() => removeItem(item)}>-</button></div>
                            </div>
                        ))}
                        {/* Display total amount */}
                        <div className="total-bayar-container">
                            <div className="bayar">
                                <button className="btn btn-success" onClick={handleBayar}>Bayar</button>
                            </div>
                            <div className="total-bayar">
                                <div className="total">
                                    <h2>Total: RM {calculateTotal().toFixed(2)}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup">
                                <h2>Bayar</h2>
                                {showPaymentAmountInput ? (
                                    <div>
                                        <input className="form-control form-control-lg" type="number" value={jumlahBayar} onChange={handleJumlahBayarChange} />
                                        <div className="preset-buttons">
                                            <button className="btn btn-secondary" onClick={() => setJumlahBayar(5)}>RM5</button>
                                            <button className="btn btn-secondary" onClick={() => setJumlahBayar(10)}>RM10</button>
                                            <button className="btn btn-secondary" onClick={() => setJumlahBayar(20)}>RM20</button>
                                            <button className="btn btn-secondary" onClick={() => setJumlahBayar(50)}>RM50</button>
                                            <button className="btn btn-secondary" onClick={() => setJumlahBayar(100)}>RM100</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                            Total Amount: RM {calculateTotal().toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                <div className='text-center'>
                                    <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: jumlahBayar > calculateTotal() ? 'green' : 'red' }}>
                                        RM {Math.abs(calculateBaki()).toFixed(2)}
                                    </span>
                                </div>
                                <div className='text-center'>
                                    <label style={{ fontSize: '1.2em', fontWeight: 'bold', color: jumlahBayar > calculateTotal() ? 'green' : 'red' }}>
                                        {jumlahBayar >= calculateTotal() ? "[Baki]" : "[Jumlah Perlu Bayar]"}
                                    </label>
                                </div>
                                <center><button className="btn btn-primary" onClick={handleClosePopup}>Close</button></center>
                            </div>
                        </div>
                    )}
                    <div className="col-12">
                        <h2 style={{ fontSize: '1.5em', marginTop: '20px' }}>Menu</h2>
                        {/* Main buttons for each category */}
                        <div className="main-buttons">
                            {categories.map((category, index) => (
                                <button key={index} className="btn btn-primary mx-2" onClick={() => setSelectedCategory(category)}>{category}</button>
                            ))}
                        </div>
                        {/* Display items based on selected category */}
                        <div className="menu">
                            {selectedCategory && filteredItemsByCategory(selectedCategory).map((item) => (
                                <div key={item.id} className="menu-item">
                                    <button className="btn btn-outline-primary menu-button mt-2" onClick={() => addItem(item)}>{item.name}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;