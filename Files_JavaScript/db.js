import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} 
from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";


// Shortstuff App Firebase Configuration
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

async function getShortcuts(db) {
  const ShortcutsCol = collection(db, "Shortcuts");
  const ShortcutsSnapshot = await getDocs(ShortcutsCol);
  const ShortcutsList = ShortcutsSnapshot.docs.map((doc) => doc); //doc.data();
  return ShortcutsList;
}

// Read Existing Shortcuts and Log in Console
getShortcuts(db).then((docs) => {
  docs.forEach((d) => {
    console.log(d.data());
  });
});

// Shortcuts App DocumentChange
const unsub = onSnapshot(collection(db, "Shortcuts"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Reads the document in Shortcuts collection
      renderShortcut(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //Deletes the document in Shortcuts collection
      removeShortcut(change.doc.id);
    }
  });
});

// Create/Add New Shortcut
const formAdd = document.querySelector("#formAddNewShortcut");
formAdd.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(collection(db, "Shortcuts"), {
    Title: formAdd.Title.value,
    Link: formAdd.Link.value
  }).catch((error) => console.log(error));
  formAdd.Title.value = "";
  formAdd.Link.value = "";
});

// Delete Shortcut
const ShortcutContainer = document.querySelector(".Shortcuts");
ShortcutContainer.addEventListener("click", (event) => {
  // console.log(event);
  if (event.target.textContent === "delete") {
    const id = event.target.getAttribute("data-id");
  deleteDoc(doc(db, "Shortcuts", id));
  }
});