//  function to get the data from API

async function getData() {
  let response = await fetch("get_data.php");
  let data = await response.json();
  let accessToken = data["oauth"]["access_token"];

  // use the access token here
  console.log(accessToken);
}

getData();


// function to populate the table with data
const populateTable = (data) => {
  const table = document.querySelector("table");
  table.innerHTML = "";

  data.forEach((item) => {
      const tr = document.createElement("tr");

      const task = document.createElement("td");
      task.textContent = item.task;
      tr.appendChild(task);

      const title = document.createElement("td");
      title.textContent = item.title;
      tr.appendChild(title);

      const description = document.createElement("td");
      description.textContent = item.description;
      tr.appendChild(description);

      const colorCode = document.createElement("td");
      colorCode.style.backgroundColor = item.colorCode;
      colorCode.style.width = "50px";
      colorCode.style.height = "50px";
      tr.appendChild(colorCode);

      table.appendChild(tr);
  });
};

// function to refresh data every 60 minutes
const refreshData = () => {
  setInterval(async () => {
      const data = await getData();
      populateTable(data);
  }, 60 * 60 * 1000);
};

// function to search in table
const searchInTable = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const tableRows = document.querySelectorAll("tr");

  tableRows.forEach((row) => {
      const rowData = row.textContent.toLowerCase();
      if (rowData.indexOf(searchTerm) === -1) {
          row.style.display = "none";
      } else {
          row.style.display = "";
      }
  });
};

// function to open the modal and select image
const openModal = () => {
  const modal = document.querySelector(".modal");
  const selectImageBtn = document.querySelector(".select-image-btn");
  const selectedImage = document.querySelector(".selected-image");

  modal.style.display = "block";

  selectImageBtn.addEventListener("click", () => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.click();

      fileInput.addEventListener("change", (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();

          reader.addEventListener("load", (event) => {
              selectedImage.src = event.target.result;
              selectedImage.style.display = "block";
          });

          reader.readAsDataURL(file);
      });
  });
};

// function to close the modal
const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
};

// event listeners
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getData();
  populateTable(data);
  refreshData();
});

const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", searchInTable);

const addTaskBtn = document.querySelector(".add-task-btn");
addTaskBtn.addEventListener("click", openModal);

const closeModalBtn = document.querySelector(".close-modal-btn");
closeModalBtn.addEventListener("click", closeModal);
