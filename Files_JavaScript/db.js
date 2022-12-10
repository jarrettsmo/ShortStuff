import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
//import { initializeApp } from '/firebase/app';
//import { getAnalytics } from "/firebase/analytics";
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
//from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

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

async function getShortcuts(db) {
  const ShortcutsCol = collection(db, "Shortcuts");
  const ShortcutsSnapshot = await getDocs(ShortcutsCol);
  const ShortcutsList = ShortcutsSnapshot.docs.map((doc) => doc); //doc.data();
  return ShortcutsList;
}

//Read Existing Shortcuts
getShortcuts(db).then((docs) => {
  docs.forEach((d) => {
    console.log(d.data());
  });
});

//Shortcuts App DocumentChange
const unsub = onSnapshot(collection(db, "Shortcuts"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Reads the document in Shortcuts collection
      renderShortcut(change.doc.data(), change.doc.id);
    }
    if (change.type === "modified") {
      //Updates the document in Shortcuts collection
      renderShortcut(change.doc.data());
    }
    if (change.type === "removed") {
      //Deletes the document in Shortcuts collection
      removeShortcut(change.doc.id);
    }
  });
});

//Create/Add New Shortcut
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

//Update/Edit Shortcut
const ShortcutEditForm = document.querySelector(".Shortcuts");
ShortcutEditForm.addEventListener("click", (event) => {

  if (event.target.textContent === "edit") {
    const id = event.target.getAttribute("data-id");
    const idSelected = document.querySelector("#targetShortcut");

    async function getShortcutTitle(id) {
      const docRef = doc(db, "Shortcuts", id);
      const docSnap = await getDoc(docRef);
      const stuff = docSnap.data();
      idSelected.innerHTML = stuff.Title;
    }
    getShortcutTitle(id);
  }
});

const formEdit = document.querySelector("#formEditNewShortcut");
formEdit.addEventListener("submit", (event) => {
  event.preventDefault();

  // async function editTheShortcut() {
  //   db.collection(".Shortcuts").doc(id).update({
  //     Title: formEdit.TitleEdit.value,
  //     Link: formEdit.LinkEdit.value,
  //   }).catch((error) => console.log(error));
  //   formEdit.TitleEdit.value = "";
  //   formEdit.LinkEdit.value = "";
  // }
  // editTheShortcut();

//   async function getShortcutTitle(id) {
//     const docRef = doc(db, "Shortcuts", id);
//     const docSnap = await getDoc(docRef);
//     const stuff = docSnap.data();
//     idSelected.innerHTML = stuff.Title;
//   }
//   editTheShortcut(id);
// }

  // async function getShortcutTitle() {
  //   const docRef = doc(db, "Shortcuts", id);
  //   const docSnap = await getDoc(docRef);
  //   const stuff = docSnap.data();
  //   console.log(stuff.Title);
  // }
  // getShortcutTitle();



  //  const ShortcutsContainers = document.querySelector(".Shortcuts");
  //  ShortcutsContainers.addEventListener("click", (event) => {
    // console.log(event);

  // getDoc(collection(db, "Shortcuts"), {
  //   Title: formEdit.Title.value,
  //   Link: formEdit.Link.value,
  // }).catch((error) => console.log(error));
  // formEdit.Title.value = "";
  // formEdit.Link.value = "";
});

//Delete Shortcut
const ShortcutContainer = document.querySelector(".Shortcuts");
ShortcutContainer.addEventListener("click", (event) => {
  // console.log(event);
  if (event.target.textContent === "delete") {
    const id = event.target.getAttribute("data-id");
  deleteDoc(doc(db, "Shortcuts", id));
  }
});

// *** TEST FUNCTION ***
// const ShortcutContainer = document.querySelector(".Shortcuts");
// ShortcutContainer.addEventListener("click", (event) => {
  // console.log(event);
  // if (event.target.tagName === "I") {
  // if (event.target.textContent === "delete") {
  //   const id = event.target.getAttribute("data-id");
  // deleteDoc(doc(db, "Shortcuts", id));
  // }
  // async function getShortcutTitle() {
  //   const docRef = doc(db, "Shortcuts", id);
  //   const docSnap = await getDoc(docRef);
  //   const stuff = docSnap.data();
  //   alert(stuff.Title);
  // }
  // getShortcutTitle();
// });