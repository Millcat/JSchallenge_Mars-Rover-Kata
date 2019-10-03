// Rover Object Goes Here
// ======================

const roversArray = [ // create an array with all the rovers

    {
        name: "RoverA",
        direction : "N",
        x: 0,
        y: 0,
        travelLog: [{ // after each move, the new coordonates will be push as an object in this array
            x:0,
            y:0
        }]
    },

    {
        name: "RoverB",
        direction : "E",
        x: 0,
        y: 1,
        travelLog: [{
            x:0,
            y:1
        }]
    },

    {
        name: "RoverC",
        direction : "S",
        x: 5,
        y: 1,
        travelLog: [{
            x:5,
            y:1
        }]
    }
];

let rover = roversArray[0]; // choose which rover I want to control (to not change all my code)

// ====================== Obstacles // 0 means "OK go and do the move", "1" means "Obstacle! No Go"

const map = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 1, 1, 0, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];


function isInsideMap(x, y) { // variables to fix the limit of the map
    const outLeft = x < 0;
    const outRight = x > map[0].length - 1;
    const outTop = y < 0;
    const outBottom = y > map.length - 1;

    if (outLeft || outRight || outTop || outBottom) { // if the rover is out the map
        console.log("Can't go: end of the map !");
        return false;
    }
    return true; // condition to be inside the map

    // if (x >= 0 && x <= map[0].length-1 && y >= 0 && y <= map.length-1) {  //  is in the y columns of the map? ...
    //     return true;                                   // ...then is inside the map ;)
    // } else {
    //     console.log("Can't go: end of the map !");
    //     return false;
    // }
}


function isNoObstacle(x, y) {
    if (map[y][x] === 0) {                             //if there is no Obstacles...
        return true;                                   //...then you can go
    } else {
        console.log("Can't go: there is an obstacle !");
        return false;
    }
}

/* idem than isNoObstacle but instead => isNoRover.
Each new rover change the number 0 in map when is here */

function isNoRover(x, y) { // check if the coordonates of my rover are different of the others roversArray[1,2,3,...]
    let hasRover = false;

    roversArray.forEach(rover => { // for each rover in the array
        if (rover.x === x && rover.y === y) { // if {x,y} of my rover are the same than others rovers ones
            hasRover = true; // then THERE IS a rover and print message
            console.log(`Can't go : there is the rover ${rover.name}`); // & name of the rover here
        }
        return !hasRover; // means that there is no rover !
    });
}


function canGo(x,y) { // if isInsideMap = true and ifNoObstacles = true and isNoRover = true ,THEN you canGo = true
    if (isInsideMap(x,y) && isNoObstacle(x,y) && isNoRover(x, y)) {
        return true;
    }
    return false;
}


// ====================== to turn

function turnLeft(rover) { // with function createNewRover(), I need to modify all the Object.property
    switch (rover.direction) {
        case "N":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "N";
            break;
        default: console.log("Enter a right direction");
            break;
    }
    console.log(`turnLeft was called ! The rover is now facing ${rover.direction}`);
}

// test turnLeft function : OK
// turnLeft(rover);


function turnRight(rover) {
    switch (rover.direction) {
        case "N":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "N";
            break;
        default: console.log("Enter a right direction");
            break;
    }
    console.log(`turnRight was called ! The rover is now facing ${rover.direction}`);
}

// test turnRight function : OK
// turnRight(rover);


// ====================== to move

function moveForward(rover) {
    let hasMoved = false;

    switch (rover.direction) {
        case "N":
            if (canGo(rover.x, rover.y-1)) {
                rover.y--;
                hasMoved = true;
            }
            break;
        case "E":
            if (canGo(rover.x+1, rover.y)) {
                rover.x++;
                hasMoved = true;
            }
            break;
        case "S":
            if (canGo(rover.x, rover.y+1)) {
                rover.y++;
                hasMoved = true;
            }
            break;
        case "W":
            if (canGo(rover.x-1, rover.y)) {
                rover.x--;
                hasMoved = true;
            }
            break;
        default: console.log("Enter a right direction");
            break;
    }

    if (hasMoved) {
        console.log(`The rover has moved forward ! It's now at x:${rover.x} and y:${rover.y}`);
        rover.travelLog.push({ // fills the TravelLog with new coordonates
            x: rover.x,
            y: rover.y
        });
    }
}

// test moveForward function = OK
// moveForward(rover);


function moveBackward(rover) {
    let hasMoved = false;

    switch (rover.direction) {
        case "N":
            if (canGo(rover.x, rover.y+1)) {
                rover.y++;
                hasMoved = true;
            }
            break;
        case "E":
            if (canGo(rover.x-1, rover.y)) {
                rover.x--;
                hasMoved = true;
            }
            break;
        case "S":
            if (canGo(rover.x, rover.y-1)) {
                rover.y--;
                hasMoved = true;
            }
            break;
        case "W":
            if (canGo(rover.x+1, rover.y)) {
                rover.x++;
                hasMoved = true;
            }
            break;
        default: console.log("Enter a right direction");
            break;
    }

    if (hasMoved) {
        console.log(`The rover has moved backward ! It's now at x:${rover.x} and y:${rover.y}`);
        rover.travelLog.push({ // fills the TravelLog with new coordonates
            x: rover.x,
            y: rover.y
        });
    }
}

// ====================== to command

/* whereToMove is a parameter which is a string of letters either f,r or l.
This parameter has to be converted to an array and each letter will be executed by an associated function(s) */

function commands (rover, whereToMove) { // command to a rover where to move
    let separateMoves = [];  // method .split() could be use instead of this and loop
    for (i = 0; i < whereToMove.length; i++) {
        let move = whereToMove.charAt(i);
        separateMoves.push(move); //console.log(separateMoves); check if the array fills up
        switch (move) {
            case "f":
                moveForward(rover); // if the letter is f ==> moveForward function
                break;
            case "r":
                turnRight(rover);
                break;
            case "l":
                turnLeft(rover);
                break;
            case "b":
                moveBackward(rover);
                break;
            default: console.log("This is not a right direction");
                break;
        }
    }
    console.log(rover.travelLog); // careful at the scope of the travelLog
}


// ====================== TEST & RUN THE CODE !

// 1) Move RoverA
const myRover = roversArray[0];
//commands(myRover, "frffbf");
//==> [end map , turn to E, {1,0}, {2,0}, {1,0}, {2,0}]
//==> BUT INSTEAD I HAVE only : [end map, turn to E, end of map] and no travelLog incremented :'(
//==> None of the moveForward & moveBackward appears...

// 2) Move RoverB
const myRover = roversArray[1];
//commands(myRover, "fflfrf");
//==> [{1,1}, {2,1}, turn to N, meet roverA, turn to E, {3,1}]

// 3) Move RoverC
const myRover = roversArray[2];
//commands(myRover, "rffblf");
//==> [turn to W, {4,1}, meet roverB, {5,1}, turn to S, obstacle]

