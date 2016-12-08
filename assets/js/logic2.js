/*
  global variable to test if item was found in the web
  needs to be called by on(click, function).
*/
var found;

// Given data-set.
var theCobWeb = {
  biggestWeb: {
    item: "comb",
    biggerWeb: {
      items: ["glasses", "paperclip", "bubblegum"],
      smallerWeb: {
        item: "toothbrush",
        tinyWeb: {
          items: ["toenails", "lint", "wrapper", "homework"]
        },
        otherTinyWeb: {
          items: ["quarter", "nickel", "pennies"],
          superTinyWeb: {
            item: "dime"
          }
        }
      }
    },
    otherBigWeb: {
      item: "headphones",
      otherSmallerWeb: {
        item: "keys"
      }
    }
  }
};

function Stack() {
  this._size = 0;
  this._storage = {};
  this._level = 0;
};

Stack.prototype.add = function(data) {
  // increases the size of our storage
    var size = this._size++;
    var level = this._level;
 
    // assigns size as a key of storage
    // assigns data as the value of this key
    this._storage[size] = [data, level];
};

Stack.prototype.retrieve = function() {
  var size = this._size,
        deletedData;

  if (size) {
    //gets value of the key for last element (size) of Stack
    deletedData = this._storage[size];
 
    //deletes last element from stack
    //reduces size (current key)
    delete this._storage[size];
    this.size--;
 
    return deletedData;
  }
};

var webStack = new Stack();

function pushToStack(level, webs) {
  /*
    stops recursion at the lowest level, 
    when web passed in as an argument is no longer an object, 
    or array.
  */
  if (typeof webs === "string" || Array.isArray(webs)) {
    level--;
    return;
    
  }  

  //adds keys to stack
  //changes level
  webStack._level = level;
  webStack.add(Object.keys(webs));
  level++;
  
    
  //recursion on values to go down one level
  Object.values(webs).forEach(function(element) {pushToStack(level, element)});

};

pushToStack(0, theCobWeb);
console.log(webStack._storage);