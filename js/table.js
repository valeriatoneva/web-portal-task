function displayTable(data) {
    var table = document.getElementById("task-table");
    var tbody = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");

        var task = document.createElement("td");
        task.innerHTML = data[i].task;
        row.appendChild(task);

        var title = document.createElement("td");
        title.innerHTML = data[i].title;
        row.appendChild(title);

        var description = document.createElement("td");
        description.innerHTML = data[i].description;
        row.appendChild(description);

        var colorCode = document.createElement("td");
        colorCode.style.backgroundColor = data[i].colorCode;
        colorCode.innerHTML = data[i].colorCode;
        row.appendChild(colorCode);

        tbody.appendChild(row);
    }
}

var tasks = get_tasks();
displayTable(tasks);
