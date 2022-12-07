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
  <div class="Shortcuts card-panel" data-id="${id}">
    <a
      class="collection-item"
      href="${data.Link}"
      target="_blank"
      >${data.Title}
    </a>
    <span class="right shortcutEdit">
        <button 
          class="shortcut-edit btn-floating btn-small amber accent-4">
          <i class="material-icons" data-id="${id}">edit</i>
        </button>
        <button class="shortcut-delete btn-floating btn-small red">
          <i class="material-icons" data-id="${id}">delete</i>
        </button>
    </span>
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

//Toggle Form to Add New Shortcut
$("#addBtn").click(function(){
  $("#addNewShortcut").toggle();
});

//Toggle shortcut edit options
$("#editBtn").click(function(){
  $("span.shortcutEdit").toggle();
});