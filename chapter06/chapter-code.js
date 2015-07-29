// Methods
var rabbit = {};
rabbit.speak = function(line) {
  console.log("The rabbit says '" + line + "'");
};

rabbit.speak("I'm alive.");
function speak(line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
}
var whiteRabbit = { type: "white", speak: speak };
var fatRabbit = { type: "fat", speak: speak };

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
fatRabbit.speak("I could sure use a carrot right now.");
speak.apply(fatRabbit, ["Burp!"]);
speak.call({type: "old"}, "Oh my.");

// Prototype
var protoRabbit = {
  speak: function(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
  }
};
var killerRabit = Object.create(protoRabbit);
killerRabit.type = "killer";
killerRabit.speak("SKREEEE!");

// Constructors
function Rabbit(type) {
  this.type = type;
}

var killerRabit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);

Rabbit.prototype.speak = function (line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
};
blackRabbit.speak("Doom...");

// Prototype interference
Rabbit.prototype.dance = function() {
  console.log("The " + this.type + " rabbit dances a jig.");
};
killerRabit.dance();

var map = {foo: 0, bar:  1};
Object.defineProperty(Object.prototype, "hiddenNonsense", { enumerable: false, value: "hi"});
for (var name in map)
  console.log(name);
console.log(map.hiddenNonsense);

// Prototype-less objects

var map = Object.create(null);
map["pizza"] = 0.069;
console.log("toString" in map);
console.log("pizza" in map);

// Polymorphism

var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  return rows.map(drawRow).join("\n");
}

function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

var rows = [];
for (var i = 0; i < 5; i++) {
  var row = [];
  for (var j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0)
      row.push(new TextCell("##"));
    else
      row.push(new TextCell(" "));
  }
  rows.push(row);
}
console.log(drawTable(rows));

function UnderlinedCell(inner) {
  this.inner = inner;
};
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
}

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      return new TextCell(String(row[name]));
    });
  });
  return[headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));
