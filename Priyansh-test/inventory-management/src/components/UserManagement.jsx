import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUser.trim()) {
      await addDoc(collection(db, 'users'), { name: newUser });
      setNewUser("");
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, 'users', id));
  };

  return (
    <div>
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Add new user"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
