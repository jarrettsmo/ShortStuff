import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
//import { initializeApp } from '/firebase/app';
//import { getAnalytics } from "/firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

//from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUHRkerYlu07ZaEQfVLjX9t7XWljPIgjM",
  authDomain: "shortstuff-14e13.firebaseapp.com",
  projectId: "shortstuff-14e13",
  storageBucket: "shortstuff-14e13.appspot.com",
  messagingSenderId: "280480956362",
  appId: "1:280480956362:web:2b80e97c3f9c8439f95933",
  measurementId: "G-ZYG81SN5JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

//alert(db);

async function getShortcuts(db) {
  const ShortcutsCol = collection(db, "Shortcuts");
  const ShortcutsSnapshot = await getDocs(ShortcutsCol);
  const ShortcutsList = ShortcutsSnapshot.docs.map((doc) => doc); //doc.data();
  return ShortcutsList;
}

//console.log(getShortcuts(db));

getShortcuts(db).then((docs) => {
  docs.forEach((d) => {
    console.log(d.data());
  });
});

const unsub = onSnapshot(collection(db, "Shortcuts"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Call render function in UI
      renderShortcut(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //do something
      removeShortcut(change.doc.id);
    }
  });
});

//add new shortcut
const form = document.querySelector("#addBtn");
form.addEventListener("click", (event) => {
  event.preventDefault();

  addDoc(collection(db, "Shortcuts"), {
    Title: form.Title.value,
    Link: form.Link.value,
  }).catch((error) => console.log(error));
  form.Title.value = "";
  form.Link.value = "";
});

//delete shortcut
const ShortcutContainer = document.querySelector(".Shortcuts");
ShortcutContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "Shortcuts", id));
  }
});