function addTodo() {
  var name = document.getElementById("todoName").value.trim();
  var desc = document.getElementById("todoDesc").value.trim();

  if (!name || !desc) {
    alert("Please enter both name and description.");
    return;
  }

  var col = document.createElement("div");
  col.className = "col-md-4";

  var card = document.createElement("div");
  card.className = "card shadow";

  
  var cardHeader = document.createElement("div");
  cardHeader.className = "card-header fw-bold text-secondary";
  cardHeader.textContent = "Task";
  card.appendChild(cardHeader);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  var nameInput = document.createElement("input");
  nameInput.className = "form-control mb-2";
  nameInput.type = "text";
  nameInput.value = name;
  nameInput.disabled = true;


  var descArea = document.createElement("textarea");
  descArea.className = "form-control mb-2";
  descArea.value = desc;
  descArea.disabled = true;
  descArea.style.display = "none";


  var btnGroup = document.createElement("div");
  btnGroup.className = "d-flex justify-content-between flex-wrap gap-2";


  var editBtn = document.createElement("button");
  editBtn.textContent = "✏️ Edit";
  editBtn.className = "btn btn-warning btn-sm";
  editBtn.onclick = function () {
    nameInput.disabled = false;
    descArea.disabled = false;
    descArea.style.display = "block";
    saveBtn.style.display = "inline-block";
    nameInput.focus();
  };

  
  var saveBtn = document.createElement("button");
  saveBtn.textContent = "💾 Save";
  saveBtn.className = "btn btn-success btn-sm";
  saveBtn.style.display = "none";
  saveBtn.onclick = function () {
    nameInput.disabled = true;
    descArea.disabled = true;
    descArea.style.display = "none";
    saveBtn.style.display = "none";
  };

  
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌ Delete";
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.onclick = function () {
    col.remove();
  };

 
  var markDoneBtn = document.createElement("button");
  markDoneBtn.textContent = "✅ Mark as Done";
  markDoneBtn.className = "btn btn-outline-primary btn-sm";
 markDoneBtn.onclick = function () {
  var addedCard = col.cloneNode(true);

  var inputs = addedCard.querySelectorAll("input, textarea");
  inputs.forEach((input) => (input.disabled = true));


  var markBtn = addedCard.querySelector("button.btn-outline-primary");
  var saveInClone = addedCard.querySelector("button.btn-success");
  var editBtnClone = addedCard.querySelector("button.btn-warning");
  var deleteBtnClone = addedCard.querySelector("button.btn-danger");

  if (markBtn) markBtn.remove();
  if (saveInClone) saveInClone.remove();
  if (editBtnClone) editBtnClone.remove();
  if (deleteBtnClone) deleteBtnClone.remove();


  var badge = document.createElement("span");
  badge.className = "badge bg-success mb-2";
  badge.textContent = "Done";
  addedCard.querySelector(".card-body").prepend(badge);


  var viewBtn = document.createElement("button");
  viewBtn.textContent = "👁️ View";
  viewBtn.className = "btn btn-info btn-sm";


  var viewBox = document.createElement("div");
  viewBox.className = "mt-3 p-2 border rounded bg-light";
  viewBox.style.display = "none";
  viewBox.innerHTML = `
    <h6 class="text-primary">📌 Task Name</h6>
    <p>${name}</p>
    <h6 class="text-primary">📝 Description</h6>
    <p>${desc}</p>
  `;

  viewBtn.onclick = function () {
    viewBox.style.display = viewBox.style.display === "none" ? "block" : "none";
  };

  addedCard.querySelector(".card-body").appendChild(viewBtn);
  addedCard.querySelector(".card-body").appendChild(viewBox);

  document.getElementById("addedTasks").appendChild(addedCard);

  
  col.remove();
};


  
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(saveBtn);
  btnGroup.appendChild(deleteBtn);
  btnGroup.appendChild(markDoneBtn);

  
  cardBody.appendChild(nameInput);
  cardBody.appendChild(descArea);
  cardBody.appendChild(btnGroup);
  card.appendChild(cardBody);
  col.appendChild(card);

  
  document.getElementById("todoList").appendChild(col);


  document.getElementById("todoName").value = "";
  document.getElementById("todoDesc").value = "";
}
