import { GoogleAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDOKNHJlCxcF9kx_d-4DgHPU6biOyPlcBE",
  authDomain: "medium-adc3f.firebaseapp.com",
  projectId: "medium-adc3f",
  storageBucket: "medium-adc3f.appspot.com",
  messagingSenderId: "292366204394",
  appId: "1:292366204394:web:fc843f92d3d011e17b8693"
};


const app = initializeApp(firebaseConfig);





const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async() =>{
    let user = null;
    await signInWithPopup(auth, provider)
    .then((result) =>{
        user = result.user
    })
    .catch((error) =>{
        console.log(error)
    })

    return user;
}
