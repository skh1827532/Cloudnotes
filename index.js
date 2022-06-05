let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addItem);
showNotes();

function addItem() {
  let title = document.querySelector(".titleText").value;
  let description = document.querySelector(".descriptionText").value;
  console.log(title, description);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesCont = [];
  } else {
    notesCont = JSON.parse(notes);
  }

  notesCont.push({
    title: title,
    description: description,
  });

  localStorage.setItem("notes", JSON.stringify(notesCont));
  showNotes();
  document.querySelector(".titleText").value = "";
  document.querySelector(".descriptionText").value = "";
}

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesCont = [];
  } else {
    notesCont = JSON.parse(notes);
  }
  let html = "";
  notesCont.forEach((elem, index) => {
    html += `<div class="card mx-2 my-2" style="width: 18rem;">
     
        <div class="card-body">
          <h5 class="card-title">${elem.title}</h5>
          <p class="card-text">${elem.description}</p>
          <a href="#" class="btn btn-primary" id=${index} onClick=deleteNote(this.id)>Delete Note</a>
        </div>
      </div>`;
  });

  let itemsContainer = document.querySelector(".itemsContainer");
  console.log(itemsContainer.innerHTML);
  itemsContainer.innerHTML = html;

  //   itemsContainer.innerHTML = html;
}

function deleteNote(id) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesCont = [];
  } else {
    notesCont = JSON.parse(notes);
  }
  notesCont.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(notesCont));
  showNotes();
}
