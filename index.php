<!DOCTYPE html>
<html>
<head>
  <title>Task List</title>
  <link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<body>
  <table id="task-table">
  <thead>
  <tr>
    <th>Task</th>
    <th>Title</th>
    <th>Description</th>
    <th>Color Code</th>
  </tr>
</thead>

    <tbody>
    <tr>
  <td>Task 1</td>
  <td>Title 1</td>
  <td>Description 1</td>
  <td style="background-color: #ff0000;"></td>
</tr>
<tr>
  <td>Task 2</td>
  <td>Title 2</td>
  <td>Description 2</td>
  <td style="background-color: #00ff00;"></td>
</tr>
    </tbody>
  </table>
  <button id="open-modal-btn">Open Modal</button>
  <div id="modal">
    <button id="select-image-btn">Select Image</button>
    <img id="selected-image">
  </div>
  <script src="js/table.js"></script>
  <script src="js/search.js"></script>
  <script src="js/refresh.js"></script>
  <script src="js/modal.js"></script>
</body>
</html>
