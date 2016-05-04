//Automobile.js by Colleen Minor
//Week 4 CS-WebDev Assignment
//Class: CS290 Oregon State University
//Term: Spring 2016

var logging = console.log.bind(console);

function Automobile(year, make, model, type) {
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function(bool) {
        if (bool) { //Case type sort
            logging(this.year + " " + this.make + " " + this.model + " " + this.type);
        } else { //Case make or year sort
            logging(this.year + " " + this.make + " " + this.model);
        }
    };
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/*This function sorts arrays using an arbitrary comparator.
 You pass it a comparator and an array of objects appropriate for that comparator and it will return
  a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array) {
    //Bubble sort:
    var len = array.length;

    for (var i = len - 1; i >= 0; i--) { //Starting at each index...
        for (var j = 1; j <= i; j++) { //Compare every higher index
            if (!comparator(array[j - 1], array[j])) { //If first item is lesser than second...
                var temp = array[j - 1]; //then swap them
                array[j - 1] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}


/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2) {
    if (auto1.year > auto2.year) {
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their make.
It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2) {
    var make1 = auto1.make.toLowerCase();
    var make2 = auto2.make.toLowerCase();;
    if (make1 > make2) {
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their type.
The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed).
It should be case insensitive.
If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2) {
    var type1 = auto1.type.toLowerCase();
    var type2 = auto2.type.toLowerCase();
    var type1Enum = ["wagon", "suv", "pickup", "roadster"].indexOf(type1);
    var type2Enum = ["wagon", "suv", "pickup", "roadster"].indexOf(type2);
    if (type1Enum > type2Enum) {
        return true;
    } else if (type2Enum < type1Enum) {
        return false;
    } else if (type2Enum === type1Enum) {
        var bool = yearComparator(auto1, auto2);
        return bool;
    }
}

function printSorted(comparator, array, bool) {
    var sorted = sortArr(comparator, array);
    for (var i = 0; i < sorted.length; i++) {
        {
            sorted[i].logMe(bool);
        }
    }
}

console.log('*****')

console.log('The cars sorted by year are:');
var yearSort = sortArr(yearComparator, automobiles);
printSorted(yearComparator, automobiles, false);
console.log('');

console.log('The cars sorted by make are:');
var makeSort = sortArr(makeComparator, automobiles);
printSorted(makeComparator, automobiles, false);
console.log('');

console.log('The cars sorted by type are:');
var typeSort = sortArr(typeComparator, automobiles);
printSorted(typeComparator, automobiles, true);

console.log('*****');
