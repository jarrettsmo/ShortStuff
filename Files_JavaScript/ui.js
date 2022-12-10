// Selector of All Elements with "Shortcuts" Class
const Shortcuts = document.querySelector(".Shortcuts");

// Document Listeners After All DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  // Add Shortcuts
  const forms = document.querySelectorAll(".side-form");
});

// Render Shortcuts Function
function renderShortcut(data, id) {
  const html = `
  <div class="Shortcuts flex-container" data-id="${id}">
    <div class="customCardPanel valign-wrapper">
      <div class="col s10 left-align">
        <a
          class=""
          href="${data.Link}"
          target="_blank"
          >${data.Title}
        </a>
      </div>
      <div class="col s2 right-align">
        <button class="shortcut-delete btn-floating btn-small red">
          <i class="material-icons" data-id="${id}">delete</i>
        </button>
      </div>
    </div>
  </div>
  `;
  Shortcuts.innerHTML += html;
}

// Remove Shortcut from DOM
const removeShortcut = (id) => {
  const Shortcuts = document.querySelector(`.Shortcuts[data-id="${id}"]`);
  // console.log(Shortcut);
  Shortcuts.remove();
};

// Toggle Form to Add New Shortcut
$("#addBtn").click(function(){
  $("#addNewShortcut").toggle();
  $(".shortcut-delete").hide();
});

// Toggle Shortcut Edit/Delete options
$("#removeBtn").click(function(){
  $(".shortcut-delete").toggle();
  $("#addNewShortcut").hide();
});