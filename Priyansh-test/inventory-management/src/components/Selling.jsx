import { useState, useEffect } from "react";
import { fetchItems, updateItemQuantity } from "../firebase/crudOperations";
import './Selling.css';

const Selling = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    };
    loadItems();
  }, []);

  useEffect(() => {
    const selectedItem = items.find(item => item.id === selectedItemId);
    if (selectedItem) {
      const newSubtotal = selectedItem.price * quantity;
      setSubtotal(newSubtotal);
    } else {
      setSubtotal(0);
    }
  }, [selectedItemId, quantity, items]);

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
  };

  const handleItemSelect = (e) => {
    setSelectedItemId(e.target.value);
    setQuantity(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedItem = items.find(item => item.id === selectedItemId);

    if (selectedItem) {
      if (selectedItem.quantity < quantity) {
        alert("Insufficient stock!");
      } else {
        const updatedQuantity = selectedItem.quantity - quantity;
        await updateItemQuantity(selectedItemId, updatedQuantity);
        alert(`Sale Successful!\nCustomer: ${customerName}\nSubtotal: $${subtotal.toFixed(2)}`);
        setSelectedItemId("");
        setQuantity(1);
        setCustomerName("");
        setSubtotal(0);
      }
    }
  };

  return (
    <div className="selling">
      <h2>Sell an Item</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedItemId} onChange={handleItemSelect}>
          <option value="">Select an item</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>
              {item.name} (Available: {item.quantity}, Price: ${item.price})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Quantity"
          required
        />
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          required
        />
        <button type="submit">Complete Sale</button>
      </form>
      <div>
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Selling;
