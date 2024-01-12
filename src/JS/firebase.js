import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, collection, addDoc, getDocs, deleteDoc, updateDoc} from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyA3x9R_ex5-K9iN2ppH5msEKH6LLIXQuyo",
  authDomain: "movieapp-57142.firebaseapp.com",
  projectId: "movieapp-57142",
  storageBucket: "movieapp-57142.appspot.com",
  messagingSenderId: "118095356900",
  appId: "1:118095356900:web:f9851c7ce697e22dd8ddf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
console.log(db)

export async function addDataToFirestore(MovieName){
  try {
    const docRef = await addDoc(collection(db, "Movies"), {
      name: MovieName,
      done: false,
      data: Date.now(),     
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }  
} 

/* export async function addDataToFirestore(movieList){
  try {
    for (const movie of movieList) {
      const docRef = await addDoc(collection(db, "Movies"), {
        done: movie.done,
        name: movie.name,      
      });
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
} */


export async function readDataToFirestore(){
    const querySnapshot = await getDocs(collection(db, "Movies"));
    const movieDB = [];   
    querySnapshot.forEach((doc) => {
      movieDB.push({
        id: doc.id,
        name: doc.data().name,
        done: doc.data().done,
        data: doc.data().data
      })
      movieDB.sort((a, b) => a.data < b.data ? 1:-1);
    });     
    return movieDB;
}


export async function deleteDataToFirestore (id) {
  const postRef = doc(db, "Movies", id); 
  try {
      await deleteDoc(postRef);
  } catch {
      console.log ('ошибка удаления поста')
  }
  
}




export async function updateDataToFirestore (id, updatedDoneMovie){
  const ref = doc(db, "Movies", id);

  await updateDoc(ref, {
    done: updatedDoneMovie

  });
}
