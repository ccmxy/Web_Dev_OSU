/**** May 1, 2016: "Cell Selector" by Colleen Minor *****/

var newTable = document.createElement("table");
newTable.border = "1";

/***** CREATE HEADER ROW *****/
var thead = document.createElement("thead"); //Create table header
newTable.appendChild(thead); //Add as child of newTable
var tr = document.createElement("tr"); //Create row
thead.appendChild(tr);
for (i = 1; i < 5; i++) { //Add 4 columns
    var headerCol = document.createElement("td");
    headerCol.textContent = "Header " + i + "";
    tr.appendChild(headerCol);
}

/**** CREATE OTHER ROWS ****/
var tbody = document.createElement("tbody"); //Create table body
newTable.appendChild(tbody);
//Create 3 more rows with 4 columns each:
for (var i = 0; i < 3; i++) {
    var tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (var j = 0; j < 4; j++) {
        var th = document.createElement("td");
        th.textContent = (i + "," + j);
        var parentRowOfColumn = tbody.children[i];
        parentRowOfColumn.appendChild(th);
    }
}

/***SELECT THE UPPER LEFT CELL ****/
var upperLeftCell = tbody.children[0].children[0];
upperLeftCell.id = "selected";
upperLeftCell.style.borderWidth = "thick";

/***ADD TABLE TO DOCUMENT ****/
document.getElementById("tableContainer").appendChild(newTable);

/***CREATE UP BUTTON ****/
var upButton = document.createElement("button");
var upText = document.createTextNode("Up");
upButton.appendChild(upText);
upButton.style.backgroundColor = "#D2FFFF";
upButton.addEventListener("click", upButtonClick);
document.getElementById("buttonContainer").appendChild(upButton);

createLineBreak();

/***CREATE LEFT BUTTON ****/
var leftButton = document.createElement("button");
var leftText = document.createTextNode("Left"); // Create a text node
leftButton.appendChild(leftText);
leftButton.style.backgroundColor = "#D2FFFF";
document.getElementById("buttonContainer").appendChild(leftButton);
leftButton.addEventListener("click", leftButtonClick);

/***CREATE RIGHT BUTTON ****/
var rightButton = document.createElement("button");
var rightText = document.createTextNode("Right");
rightButton.appendChild(rightText);
rightButton.style.backgroundColor = "#D2FFFF";
rightButton.addEventListener("click", rightButtonClick);
document.getElementById("buttonContainer").appendChild(rightButton);

createLineBreak();

/***CREATE DOWN BUTTON ****/
var downButton = document.createElement("button");
var downText = document.createTextNode("Down");
downButton.appendChild(downText);
downButton.style.backgroundColor = "#D2FFFF";
downButton.addEventListener("click", downButtonClick);
document.getElementById("buttonContainer").appendChild(downButton);

createLineBreak();
createLineBreak();


/***CREATE MARK CELL BUTTON ****/
var selectButton = document.createElement("button");
var selectText = document.createTextNode("Mark Cell");
selectButton.appendChild(selectText);
selectButton.style.backgroundColor = "#EDC8FF";
selectButton.addEventListener("click", selectButtonClick);
document.getElementById("buttonContainer").appendChild(selectButton);

function rightButtonClick(event) {
    var selectedCell = document.getElementById("selected");
    var thisRow = selectedCell.parentNode.children;
    //Ensure not at end of row
    if (thisRow[3] === selectedCell) {
        return;
    }
    selectedCell.style.borderWidth = "thin";
    selectedCell.id = "notSelected";
    var nextCell = selectedCell.nextElementSibling;
    nextCell.id = "selected";
    nextCell.style.borderWidth = "thick";
}

function leftButtonClick(event) {
    var selectedCell = document.getElementById("selected");
    var thisRow = selectedCell.parentNode.children;
    //Ensure not at beginning of row
    if (thisRow[0] === selectedCell) {
        return;
    }
    selectedCell.style.borderWidth = "thin";
    selectedCell.id = "notSelected";
    var nextCell = selectedCell.previousElementSibling;
    nextCell.id = "selected";
    nextCell.style.borderWidth = "thick";
}

function upButtonClick(event) {
    var selectedCell = document.getElementById("selected");
    parentNodeOfSelected = selectedCell.parentNode;
    childList = parentNodeOfSelected.children;
    //Find column index:
    for (i = 0; i < 4; i++) {
        if (childList[i] === selectedCell) {
            theIndex = i;
        }
    }
    //Go to above row
    listOfRows = tbody.children;
    for (i = 0; i < 3; i++) {
      //Find index of current row:
        if (listOfRows[i] === parentNodeOfSelected) {
            if (i === 0) { //Do nothing if on top
                return;
            } else {
                upperRowIndex = (i - 1);
                upperRow = listOfRows[upperRowIndex];
                colsInUpperRow = upperRow.children;
                newSelect = colsInUpperRow[theIndex];
                selectedCell.style.borderWidth = "thin";
                selectedCell.id = "notSelected";
                newSelect.style.borderWidth = "thick";
                newSelect.id = "selected";
            }
        }
    }
}

function downButtonClick(event) {
    var selectedCell = document.getElementById("selected");
    parentNodeOfSelected = selectedCell.parentNode;
    childList = parentNodeOfSelected.children;
    //Find index in row
    for (i = 0; i < 4; i++) {
        if (childList[i] === selectedCell) {
            theIndex = i;
        }
    }

    //Find index of current row:
    listOfRows = tbody.children;
    for (i = 0; i < 3; i++) {
        if (listOfRows[i] === parentNodeOfSelected) {
            if (i === 2) { //Do nothing if selected in bottom row
                return;
            } else {
                //Get new select into variable:
                lowerRowIndex = (i + 1);
                lowerRow = listOfRows[lowerRowIndex];
                lowerRowChildren = lowerRow.children;
                newSelect = lowerRowChildren[theIndex];
                //Deselect old cell, select new one:
                selectedCell.style.borderWidth = "thin";
                selectedCell.id = "notSelected";
                newSelect.style.borderWidth = "thick";
                newSelect.id = "selected";
            }
        }
    }
}

function selectButtonClick(event) {
    var selectedCell = document.getElementById("selected");
    selectedCell.style.backgroundColor = "yellow";
}

function createLineBreak(){
  linebreak = document.createElement("br");
  document.getElementById("buttonContainer").appendChild(linebreak);
}
