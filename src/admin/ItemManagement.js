import React, { useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../auth/AuthProvider';

export default function ItemManagement() {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    
    const { webToken } = useContext(AuthContext);

    const handleChangeItemName = (event) => {
        setItemName(event.target.value);
    }

    const handleChangeItemDescription = (event) => {
        setItemDescription(event.target.value);
    }

    const handleChangeItemPrice = (event) => {
        setItemPrice(event.target.value)
    }

    const handleClick = async () => {
        const response = await axios.post('http://localhost:4000/items', {
            name: itemName, description: itemDescription, price: itemPrice
        }, { headers: { 'Authorization': `Bearer ${webToken}`}})
    }

    return (
        <div>
            ADMIN SECTION

            <form onSubmit={(event) => event.preventDefault()}>
            <label>Item name
                <input value={itemName} onChange={handleChangeItemName} />
            </label>
            <br/>
            <label>Item description
                <input value={itemDescription} onChange={handleChangeItemDescription} />
            </label>
            <br/>
            <label>Item price
                <input type="number" value={itemPrice} onChange={handleChangeItemPrice} />
            </label>
            <br/>
            <button onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}
