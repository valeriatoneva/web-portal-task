let accessToken = null;
let dataset = [];

async function getData() {
  if (!accessToken) {
    await login();
  }

  const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.baubuddy.de/dev/index.php/v1/tasks/select', {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    dataset = await response.json();
    if (Array.isArray(dataset)) {
      populateTable(dataset);
      refreshData();
    }
  }
}


async function login() {
  const authorizationHeader = "Basic " + btoa("API_Explorer:123456isALamePass");
  
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.baubuddy.de/index.php/login', {
  method: "POST",
  headers: {
  "Authorization": authorizationHeader,
  "Content-Type": "application/json"
  },
  body: JSON.stringify({
  username: "365",
  password: "1"
  })
  });
  
  if (response.ok) {
  const json = await response.json();
  accessToken = json.oauth.access_token;
  }
} 
  // function to populate the table with data
  const populateTable = () => {
    
    const table = document.querySelector("table");
    table.innerHTML = "";
  
    if (dataset && dataset.length > 0) {
        dataset.forEach((item) => {
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
    }
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