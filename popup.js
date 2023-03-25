const deleteSelectedButton = document.getElementById("delete-selected");
const popup = document.querySelector(".popup");
const confirmDeleteCheckbox = document.getElementById("confirm-delete");
const popupOKButton = document.getElementById("popup-ok");
const popupCancelButton = document.getElementById("popup-cancel");

deleteSelectedButton.addEventListener("click", function() {
  showPopup();
  popupOKButton.removeEventListener("click", deleteSelectedItems);
  popupOKButton.addEventListener("click", deleteSelected);
});

function showPopup() {
  popup.style.display = "flex";
}

function deleteSelected() {
  const confirmCheckbox = document.getElementById("confirm-delete");
  if (confirmCheckbox.checked) {
    const selectedItems = document.querySelectorAll(".todo-list input:checked");
    selectedItems.forEach((item) => item.parentElement.remove());
    closePopup();
  } else {
    alert("Please confirm deletion by checking the checkbox.");
  }
}

function closePopup() {
  popup.style.display = "none";
  confirmDeleteCheckbox.checked = false;
}

popupOKButton.addEventListener("click", deleteSelected);
popupCancelButton.addEventListener("click", closePopup);
