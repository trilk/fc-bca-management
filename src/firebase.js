import firebase from 'firebase'

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyDU7VCKeL74lW0i-T9P7xaGwgVVT6-lW1A",
    authDomain: "fc-bca.firebaseapp.com",
    databaseURL: "https://fc-bca.firebaseio.com",
    projectId: "fc-bca",
    storageBucket: "fc-bca.appspot.com",
    messagingSenderId: "874368456194",
    appId: "1:874368456194:web:1489ef414ed95fb156391b"
};
firebase.initializeApp(config)

const db = firebase.firestore()
const ref = firebase.database()
const auth = firebase.auth()
const firestore = firebase.firestore
const provider = new firebase.auth.FacebookAuthProvider()

export {
    config,
    db,
    ref,
    firestore,
    auth,
    provider
}