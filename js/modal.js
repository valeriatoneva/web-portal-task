var btn = document.getElementById("openModalBtn");
var modal = document.getElementById("myModal");
var img = document.getElementById("modalImg");
var imgInput = document.getElementById("imgInput");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


imgInput.onclick = function() {
  this.value = null;
  this.click();
}

imgInput.onchange = function() {
  var file = this.files[0];
  var reader = new FileReader();
  reader.onloadend = function(){
      img.src = reader.result;
  }
  if(file){
      reader.readAsDataURL(file);
  }else{
    img.src = "";
  }
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
