import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCVAHtjMO1acXs4PE3RcgSeu1GzJ8lIvmE',
	authDomain: 'data-healthcare-dao.firebaseapp.com',
	projectId: 'data-healthcare-dao',
	storageBucket: 'data-healthcare-dao.appspot.com',
	messagingSenderId: '467946607410',
	appId: '1:467946607410:web:d825c488532644c27e7d2b'
}

const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
