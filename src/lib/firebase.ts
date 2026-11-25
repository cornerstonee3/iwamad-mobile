import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
 apiKey: "AIzaSyDxnPsOzh8wjFlUwDwx8CyFgC8ReXv71TA",
 authDomain: "iwamad-chat-443ec.firebaseapp.com",
 databaseURL: "https://iwamad-chat-443ec-default-rtdb.europe-west1.firebasedatabase.app",
 projectId: "iwamad-chat-443ec",
 storageBucket: "iwamad-chat-443ec.firebasestorage.app",
 messagingSenderId: "200054476666",
 appId: "1:200054476666:web:ac11b320af7c35f05490c3",
};
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);