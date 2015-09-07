var button = document.querySelector("button");

function once() {
  console.log("Done.");
  button.removeEventListener("click", once);
}

button.addEventListener("click", done);


var para = document.querySelector("p");
