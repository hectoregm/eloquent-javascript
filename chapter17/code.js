console.log(encodeURIComponent("Hello & goodbye"));
console.log(decodeURIComponent("Hello%20%26%20goodbye"));

var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", false);
req.send(null);
console.log(req.responseText);
console.log(req.status, req.statusText);
console.log(req.getResponseHeader("content-type"));

// Async requests
req = new XMLHttpRequest();
req.open("GET", "example/data.txt", true);
req.addEventListener("load", function() {
  console.log("Done: ", req.status);
});
