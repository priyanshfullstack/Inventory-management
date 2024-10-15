// src/components/Reports.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Reports.css'; 

const Reports = () => {
  const [salesData, setSalesData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesCollection = collection(db, 'sales');
        const stockCollection = collection(db, 'items'); 
        
        const salesSnapshot = await getDocs(salesCollection);
        const stockSnapshot = await getDocs(stockCollection);
        
        const salesList = salesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const stockList = stockSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setSalesData(salesList);
        setStockData(stockList);
      } catch (error) {
        console.error("Error fetching reports data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadReport = () => {
    
    alert("Download functionality to be implemented.");
   
  };

  return (
    <div className="reports">
      <h2>Reports</h2>
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <div>
          <div className="sales-report">
            <h3>Sales Report</h3>
            <button onClick={handleDownloadReport}>Download Sales Report</button>
            <ul>
              {salesData.length > 0 ? (
                salesData.map(sale => (
                  <li key={sale.id}>
                    <strong>{sale.itemName}</strong>: ${sale.amount} on {sale.date}
                  </li>
                ))
              ) : (
                <p>No sales data available.</p>
              )}
            </ul>
          </div>

          <div className="stock-report">
            <h3>Stock Report</h3>
            <button onClick={handleDownloadReport}>Download Stock Report</button>
            <ul>
              {stockData.length > 0 ? (
                stockData.map(item => (
                  <li key={item.id}>
                    <strong>{item.name}</strong>: Quantity {item.quantity}, Price ${item.price}
                  </li>
                ))
              ) : (
                <p>No stock data available.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
