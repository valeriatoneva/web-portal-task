function refreshTable() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.baubuddy.de/dev/index.php/v1/tasks/select",
    true
  );
  xhr.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      // update the table with the new data
      updateTable(data);
    }
  };
  xhr.send();
}

setInterval(refreshTable, 60 * 60 * 1000);

function updateTable(data) {
  var table = document.getElementById("task-table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow();
    var taskCell = row.insertCell(0);
    taskCell.innerHTML = data[i].task;
    var titleCell = row.insertCell(1);
    titleCell.innerHTML = data[i].title;
    var descriptionCell = row.insertCell(2);
    descriptionCell.innerHTML = data[i].description;
    var colorCodeCell = row.insertCell(3);
    colorCodeCell.style.backgroundColor = data[i].colorCode;
  }
}
