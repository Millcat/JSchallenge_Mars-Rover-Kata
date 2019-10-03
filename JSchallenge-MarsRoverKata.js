// Rover Object Goes Here
// ======================

const rover = {
    direction : "N",
    x: 0,
    y: 0,
    travelLog: [{
        x,
        y
        }
    ] // after each move, (x;y)-1 will be push in the array in an object
};

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

function canGo(x,y) { // if isInsideMap = true and ifNoObstacles = true alors canGo = true
    if (isInsideMap(x,y) && isNoObstacle(x,y)) {
        return true;
    }
    return false;
}


// ====================== to turn

function turnLeft(rover) {
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

/*test the moveForward function : "Can't go : end of the map!", "moveForward was called ! The rover is now at x:0 and y:-1"
...but I don't expect the "moveForward was called" message...*/

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
    console.log(`The rover has moved backward ! It's now at x:${rover.x} and y:${rover.y}`);
}

/* whereToMove is a parameter which is a string of letters either f,r or l.
This parameter has to be converted to an array and each letter will be executed by an associated function(s) */
function commands (whereToMove) {
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


//commands("frff"); //

