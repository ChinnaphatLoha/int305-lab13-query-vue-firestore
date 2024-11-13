import { initializeApp } from 'firebase/app';

import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'int305fb100-9f3b7.firebaseapp.com',
	projectId: 'int305fb100-9f3b7',
	storageBucket: 'int305fb100-9f3b7.firebasestorage.app',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

/**
 * @type {Firestore}
 */
const db = getFirestore(app);

export default db;
