import React, { useState } from 'react';
import '.././App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [jumlahBayar, setJumlahBayar] = useState('');
    const [showPaymentAmountInput, setShowPaymentAmountInput] = useState(false);

    const menuItems = [
        { id: 1, name: "Mi Sup", price: 5 },
        { id: 2, name: "Nasi Air", price: 6 },
        { id: 3, name: "Kuih", price: 0.6 },
        { id: 4, name: "Teh O Peng", price: 2 },
        { id: 5, name: "Teh Peng", price: 2.5 },
        // Add more items as needed
    ];

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
        setShowPaymentAmountInput(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowPaymentAmountInput(false);
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
                        {selectedItems.map((item) => (
                            <div key={item.id} className="selected-item">
                                <div>{item.name} x  <span>{item.quantity}</span></div>
                                <div>{(item.price * item.quantity).toFixed(2)}  <button type="button" className="btn btn-warning" onClick={() => removeItem(item)}>-</button></div>
                            </div>
                        ))}
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
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                            Total Amount: RM {calculateTotal().toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                <div className='text-center'>
                                    <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                        RM {Math.abs(calculateBaki()).toFixed(2)}
                                    </span>
                                </div>
                                <div className='text-center'>
                                    <label style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                                        {jumlahBayar >= calculateTotal() ? "[Baki]" : "[Jumlah Perlu Bayar]"}
                                    </label>
                                </div>
                                <center><button className="btn btn-primary" onClick={handleClosePopup}>Close</button></center>
                            </div>
                        </div>
                    )}
                    <div className="col-12">
                        <h2 style={{ fontSize: '1.5em', marginTop: '20px' }}>Menu</h2>
                        <div className="menu">
                            {menuItems.map((item) => (
                                <div key={item.id} className="menu-item">
                                    <button className="btn btn-primary menu-button" onClick={() => addItem(item)}>{item.name} - RM{item.price.toFixed(2)}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default App;
