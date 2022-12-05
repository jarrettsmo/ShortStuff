const Shortcuts = document.querySelector(".Shortcuts");

document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // Add Shortcuts
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

//Toggle Form to Add New Shortcut
$("#addBtn").click(function(){
  $("#addNewShortcut").toggle();
});

function renderShortcut(data, id) {
  const html = `
  <li data-id="${id}">
    <a 
      class="col s7 waves-effect waves-light btn shortcutMargin"
      href="${data.Link}"
      target="_blank"
      >${data.Title}</a
    >
    <a 
      class="col s2 shortcut-edit btn shortcutEdit shortcutMargin amber accent-4"
      ><i class="material-icons" data-id="${id}">edit_outline</i></a
    >
    <a class="col s2 shortcut-delete btn shortcutEdit shortcutMargin red"
      ><i class="material-icons" data-id="${id}">delete_outline</i></a
    >
  </li>
  `;

  Shortcuts.innerHTML += html;
}

//Toggle shortcut edit options
function editShortcut() {
  const x = document.getElementsByClassName(".shortcutEdit");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

//remove shortcut from DOM
const removeShortcut = (id) => {
  const Shortcuts = document.querySelector(`.Shortcuts[data-id="${id}"]`);
  // console.log(Shortcut);
  Shortcuts.remove();
};