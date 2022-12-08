const Shortcuts = document.querySelector(".Shortcuts");

document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  //M.Sidenav.init(menus, { edge: "right" });
  //const dropdowns = document.querySelectorAll(".dropdown-menu");
  //M.Sidenav.init(menus, { edge: "right" });
  // Add Shortcuts
  const forms = document.querySelectorAll(".side-form");
  //M.Sidenav.init(forms, { edge: "left" });
});

function renderShortcut(data, id) {
  const html = `
  <div class="Shortcuts flex-container" data-id="${id}">
    <div class="customCardPanel valign-wrapper">
      <div class="col s9 left-align">
        <a
          class=""
          href="${data.Link}"
          target="_blank"
          >${data.Title}
        </a>
      </div>
      <div class="col s3 right-align">
        <button class="shortcutEdit shortcut-delete btn-floating btn-small red">
          <i class="material-icons" data-id="${id}">delete</i>
        </button>
      </div>
    </div>
  </div>
  `;

  Shortcuts.innerHTML += html;
}

/*
function renderShortcutTitle(data, id) {
  const htmls = `
  <div class="Shortcuts" data-id="${id}">
    <li>
      <a 
        href="${data.Title}"
        >
      </a>
    </li>
  </div>
  `;

  Shortcuts.innerHTML += htmls;
}
*/

//remove shortcut from DOM
const removeShortcut = (id) => {
  const Shortcuts = document.querySelector(`.Shortcuts[data-id="${id}"]`);
  // console.log(Shortcut);
  Shortcuts.remove();
};

//Toggle Hide/Show Shortcuts Navigation Bar
$("#main").click(function(){
  $("mySidebar").toggle();
  $("#editingShortcut, #addNewShortcut, button.shortcutEdit").hide();
});

//Toggle Form to Add New Shortcut
$("#addBtn").click(function(){
  $("#addNewShortcut").toggle();
  $("#editingShortcut, button.shortcutEdit").hide();
});

//Toggle shortcut edit options
$("#editBtn").click(function(){
  $("#editingShortcut, button.shortcutEdit").toggle();
  $("#addNewShortcut").hide();
});