import { useState, useEffect } from "react";
import { fetchItems, addItem, deleteItem, updateItem } from "../firebase/crudOperations";
import './Dashboard.css'; 

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [godown, setGodown] = useState("");
  const [price, setPrice] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [addedItemId, setAddedItemId] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    };
    loadItems();
  }, []);

  const handleAdd = async () => {
    if (newItem && godown) {
      try {
        const addedItem = await addItem({ name: newItem, quantity: Number(quantity), godown, price: Number(price) });
        setAddedItemId(addedItem.id);
        resetForm();
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const handleEdit = async () => {
    if (currentItemId && newItem && godown) {
      try {
        await updateItem(currentItemId, { name: newItem, quantity: Number(quantity), godown, price: Number(price) });
        resetForm();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const resetForm = () => {
    setNewItem("");
    setQuantity(0);
    setGodown("");
    setPrice(0);
    setEditMode(false);
    setCurrentItemId(null);
    setAddedItemId(null);
  };

  const initiateEdit = (item) => {
    setNewItem(item.name);
    setQuantity(item.quantity);
    setGodown(item.godown);
    setPrice(item.price);
    setEditMode(true);
    setCurrentItemId(item.id);
  };

  return (
    <div className="dashboard">
      <h1>Inventory Dashboard</h1>
      <input
        type="text"
        placeholder="Item Name"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <select
        value={godown}
        onChange={(e) => setGodown(e.target.value)}
        placeholder="Select Godown"
      >
        <option value="">Select Godown</option>
        <option value="surat">Surat</option>
        <option value="navsari">Navsari</option>
        <option value="rajasthan">Rajasthan</option>
        <option value="bardoli">Bardoli</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={editMode ? handleEdit : handleAdd}>
        {editMode ? "Update Item" : "Add Item"}
      </button>
      <div className="content"> 
        <ul>
          {items.map((item) => (
            <li key={item.id} className={item.id === addedItemId ? 'added' : ''}>
              {item.name} - Quantity: {item.quantity}, Godown: {item.godown}, Price: ${item.price}
              <button className="edit" onClick={() => initiateEdit(item)}>Edit</button>
              <button className="delete" onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
