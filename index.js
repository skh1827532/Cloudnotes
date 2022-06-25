let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addItem);
showNotes();

function addItem() {
  let title = document.querySelector(".titleText").value;
  let description = document.querySelector(".descriptionText").value;
  let time = document.querySelector(".timeText").value;

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
    time: time,
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
  let itemsContainer = document.querySelector(".itemsContainer");
  if (notesCont.length == 0) {
    itemsContainer.innerHTML = "Nothing to show ...";
  } else {
    let html = "";

    notesCont.forEach((elem, index) => {
      html += `<div class="noteCard mx-2 my-2" style="width: 18rem;" id=${index}>
     
        <div class="card-body">
         
          <h5 class="card-title">${elem.title}</h5>
          <p class="card-text">${elem.description}</p>
          <p class="card-text">${elem.time}</p>

          <a href="#" id=${index} onClick=deleteNote(this.id)><img style="width:25px; height:25px;" src="EditNote.svg"/></a>
          <a href="#"  id=${index} onClick=editNote(this.id)><img style="width:25px; height:25px;" src="DeleteNote.svg"/></a>
          

        
          
        </div>
      </div>`;
    });

    console.log(itemsContainer.innerHTML);

    itemsContainer.innerHTML = html;
  }

  //   itemsContainer.innerHTML = html;
}

function deleteNote(id) {
  let responseVar = confirm("Are you sure you want to delete this note?");
  if (responseVar) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesCont = [];
    } else {
      notesCont = JSON.parse(notes);
    }
    notesCont.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notesCont));
    showNotes();
  } else {
    return;
  }
}

function editNote(e) {
  console.log(e);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesCont = [];
  } else {
    notesCont = JSON.parse(notes);
  }
  let title = notesCont[e].title;
  let description = notesCont[e].description;
  let time = notesCont[e].time;
  let saveChangesBtn = document.querySelector(".saveChangesBtn");
  saveChangesBtn.setAttribute("id", e);

  let launchBtn = document.querySelector(".launchBtn");
  launchBtn.setAttribute("id", e);
  launchBtn.click();
  let updateTitle = document.querySelector(".updateTitleText");
  let updateDescription = document.querySelector(".updateDescriptionText");
  let updateTime = document.querySelector(".updateTimeText");

  updateTitle.value = title;
  updateDescription.value = description;
  updateTime.value = time;
}

let saveChangesBtn = document.querySelector(".saveChangesBtn");
saveChangesBtn.addEventListener("click", updateNote);

function updateNote() {
  console.log(saveChangesBtn.getAttribute("id"));
  let newTitle = document.querySelector(".updateTitleText").value;
  let newDescription = document.querySelector(".updateDescriptionText").value;
  let newTime = document.querySelector(".updateTimeText").value;

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesCont = [];
  } else {
    notesCont = JSON.parse(notes);
  }

  notesCont[saveChangesBtn.getAttribute("id")].title = newTitle;
  notesCont[saveChangesBtn.getAttribute("id")].description = newDescription;
  notesCont[saveChangesBtn.getAttribute("id")].time = newTime;

  localStorage.setItem("notes", JSON.stringify(notesCont));
  showNotes();

  let closeBtn = document.querySelector(".closeBtn");
  closeBtn.click();
}

let search = document.querySelector(".searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element, index) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    let titleTxt = element
      .getElementsByTagName("h5")[0]
      .innerText.toLowerCase();

    if (cardTxt.includes(inputVal) || titleTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

const useFunc = () => {
  let alertNotes = localStorage.getItem("notes");
  if (alertNotes == null) {
    alertNotes = [];
  } else {
    alertNotes = JSON.parse(alertNotes);
  }

  alertNotes.forEach((elem) => {
    console.log(elem.time);
    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes();
    console.log(`${time}AM`);

    let newDate = new Date();
    let newTime = newDate.getHours() + ":" + newDate.getMinutes();
    if (elem.time === `${newTime}AM` || elem.time === `${newTime}PM`) {
      let audio = new Audio("alert.mp3");
      audio.play();

      // alert(
      //   "You have a note for today!\n" + elem.title + "\n" + elem.description
      // );
    }
  });
};

setInterval(useFunc, 1000);
