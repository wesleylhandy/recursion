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

//will use recursion to go through each branch of the data tree
function findItem(item, webs) {
  
  /*
    stops recursion at the lowest level, 
    when web passed in as an argument is no longer an object, 
    or array.
  */
  if (typeof webs === "string") {
    return; 
  }

  /*
    store keys of current object for 
    displaying name of web if item is found
  */
  let key = Object.keys(webs);
  //console.log(key);

  //iterates through the keys of the object at this level
  for (key in webs) {
    //creates a local variable equal to key value @ i
    var web = webs[key];
    //console.log(web);

    /*
      checking to see if this key is a web and has the item 
      hidden within, displays to html and returns true if so
    */
    if (web.hasOwnProperty("item") && web.item === item) {
        $("#web").text(" was found in: " + key);
        console.log("I found " + item + " in " + key); 
        found = true;
        return;
    }
    if (web.hasOwnProperty("items") && web.items.includes(item)) {
        $("#web").text(" was found in: " + key);
        console.log("I found " + item + " in " + key);
        found = true;
        return;
        //JSON.stringify(web, null, 2) -- using Key is clearer
    }

    //recursion on key[i] within webs.
    findItem(item, web);
  }
}

function recursion() {
  //initialize value of found, only true if item is found
  found = false;
  //empty display for new values
  $("#web").text("");
  $("#results").css("animation", "none");
  // get value of input to pass into flatten()
  let val = $("#itemEntry").val();
  console.log(val);
  //display item being investigated to user
  $("#item").text(val);
  //call function
  findItem(val, theCobWeb);
  //will only show if item is not found in flatten()
  if (found === false) {
    $("#web").text(" was not found in this web.");
  }
}

//accepts keyboard return as submit
$("form").submit(function(event) { 
  recursion();
  event.preventDefault();
});

//accepts mouseClick on submit button
$("#submit").on("click", function() {
  recursion();
});

//in progress - creating breadcrumbs from object
//for now only shows in console

let breadCrumbs = {
  breadCrumbsArray : [],
  parent : "theCobWeb",
  createBreadCrumbs : function (parent, child) {
    if (typeof child === "string") {
      this.breadCrumbsArray.push(parent);
      return; 
    }
    //compile breadcrumb trail using parent and key
    //then recursion passing parent and new child
    let key = Object.keys(child);
    for (key in child) {
      var web = child[key];
      if (!(parseInt(key) >= 0)) {
        parent = parent + "." + key;
      }
      this.createBreadCrumbs(parent, web);
    }
  },
  cleanUpArray : function (bcArray) {
    //remove extraneous item(s) from middle of breadcrumbs
    for (let x = 0; x < bcArray.length; x++) {
      //break apart breadcrumb array
      let breadCrumb = bcArray[x].split(".");
      for (let z = 0; z < breadCrumb.length; z++) {
        //check for item(s) in the middle of array and delete
        if ((breadCrumb[z] === "item" 
          || breadCrumb[z] === "items") 
          && z !== (breadCrumb.length -1)) {
          breadCrumb.splice(z, 1);
        }
      }
      //put breadcrumb back together in dot notation
      let newBreadCrumb = breadCrumb.join(".");
      bcArray[x] = newBreadCrumb;
    }
    //remove duplicates
    for (let dupCheck = bcArray.length - 1;
          dupCheck > 0; dupCheck--) {
      if (bcArray[dupCheck] === bcArray[dupCheck - 1]) {
        let c = bcArray.splice(dupCheck, 1);
      }
    }
  },
  start : function () {
    this.createBreadCrumbs(this.parent, theCobWeb);
    this.cleanUpArray(this.breadCrumbsArray);
  }
}

breadCrumbs.start(); // can be called by a DOM event
console.log(breadCrumbs.breadCrumbsArray);

//use bc array to display tree in browser
