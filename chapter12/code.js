function talksAbout(node, string) {
  if (node.nodeType == document.ELEMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; i++) {
      if (talksAbout(node.childNodes[i], string))
        return true;
    }
    return false;
  } else if (node.nodeType == document.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

function replaceImages() {
  var images = document.body.getElementsByTagName("img");
  for (var i = image.length - 1; i >= 0; i--) {
    var image = images[i];
    if (image.alt) {
      var text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}
