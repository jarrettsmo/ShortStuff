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

//Read existing shortcuts
getShortcuts(db).then((docs) => {
  docs.forEach((d) => {
    console.log(d.data());
  });
});

//Shortcut document snapshots
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

//Create new shortcut
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(collection(db, "Shortcuts"), {
    Title: form.Title.value,
    Link: form.Link.value,
  }).catch((error) => console.log(error));
  form.Title.value = "";
  form.Link.value = "";
});

//Update/Edit shortcut
 const ShortcutsContainers = document.querySelector(".Shortcuts");
 ShortcutsContainers.addEventListener("click", (event) => {
  // console.log(event);
  
   /*
  if (event.target.tagName === "I") {
     const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "Shortcuts", id));
  }*/
});

//Delete shortcut
const ShortcutContainer = document.querySelector(".Shortcuts");
ShortcutContainer.addEventListener("click", (event) => {
  // console.log(event);
  // if (event.target.tagName === "I") {
     const id = event.target.getAttribute("data-id");
  //   deleteDoc(doc(db, "Shortcuts", id));
  // }
  async function getShortcutTitle() {
    const docRef = doc(db, "Shortcuts", id);
    const docSnap = await getDoc(docRef);
    const stuff = docSnap.data();
    alert(stuff.Title);
  }
  getShortcutTitle();
});

function bang(id) {
  $("#editingShortcut, button.shortcutEdit").toggle();
  $("#addNewShortcut").hide();
  const docRef = doc(db, "Shortcuts", id);
  const docSnap = getDoc(docRef);
  alert(docSnap);
}

// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('select');
//   var instances = M.FormSelect.init(elems, options);
// });

// // Or with jQuery

// $(document).ready(function(){
//   $('select').formSelect();
// });

// var instance = M.FormSelect.getInstance(elem);

  /* jQuery Method Calls
    You can still use the old jQuery plugin method calls.
    But you won't be able to access instance properties.

    $('select').formSelect('methodName');
    $('select').formSelect('methodName', paramName);
  */