import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";


export const fetchItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const items = [];
  querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
  return items;
};


export const addItem = async (itemData) => {
  await addDoc(collection(db, "items"), itemData);
};

export const deleteItem = async (id) => {
  const itemRef = doc(db, "items", id);
  await deleteDoc(itemRef);
};


export const updateItem = async (id, updatedData) => {
  const itemRef = doc(db, "items", id);
  await updateDoc(itemRef, updatedData);
};


export const updateItemQuantity = async (id, newQuantity) => {
  const itemRef = doc(db, "items", id);
  try {
    await updateDoc(itemRef, {
      quantity: newQuantity 
    });
    console.log("Item quantity updated successfully");
  } catch (error) {
    console.error("Error updating item quantity: ", error);
  }
};
