import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Home.css';

const Home = ({ refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredItems, setFilteredItems] = useState([]);
  const [godownFilter, setGodownFilter] = useState("");
  const [stockThreshold, setStockThreshold] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsCollection = collection(db, 'items');
        const snapshot = await getDocs(itemsCollection);
        const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemList);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchStockThreshold = async () => {
      try {
        const settingsCollection = collection(db, 'settings');
        const snapshot = await getDocs(settingsCollection);
        const settings = snapshot.docs.map(doc => doc.data());

        const threshold = settings[0]?.stockThreshold;
        setStockThreshold(threshold);
      } catch (error) {
        console.error("Error fetching stock threshold:", error);
      }
    };

    fetchStockThreshold();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGodown = godownFilter ? item.godown === godownFilter : true;
      return matchesSearch && matchesGodown;
    });

    const sorted = filtered.sort((a, b) => {
      return sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
    });

    setFilteredItems(sorted);

    if (stockThreshold !== null) {
      const lowStockItems = filtered.filter(item => item.quantity < stockThreshold);
      if (lowStockItems.length > 0) {
        alert(`Low stock alert! Items below threshold: ${lowStockItems.map(item => item.name).join(", ")}`);
      }
    }
  }, [items, searchTerm, sortOrder, godownFilter, stockThreshold]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleGodownChange = (event) => {
    setGodownFilter(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="home">
      <h1>Welcome to Inventory Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Inventory Items</h2>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="asc">Sort by Quantity: Low to High</option>
            <option value="desc">Sort by Quantity: High to Low</option>
          </select>
          <select onChange={handleGodownChange} value={godownFilter}>
            <option value="">All Locations</option>
            <option value="surat">Surat</option>
            <option value="navsari">Navsari</option>
            <option value="rajasthan">Rajasthan</option>
            <option value="bardoli">Bardoli</option>
          </select>
          <ul>
            {currentItems.length > 0 ? (
              currentItems.map(item => (
                <li key={item.id}>
                  <strong>{item.name}</strong>: {item.description} (Quantity: {item.quantity}, Godown: {item.godown}, Price: ${item.price})
                </li>
              ))
            ) : (
              <p>No items found.</p>
            )}
          </ul>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
