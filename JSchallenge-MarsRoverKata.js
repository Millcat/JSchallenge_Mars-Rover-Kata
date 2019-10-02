// Rover Object Goes Here
// ======================

const rover = {
    direction : "N",
    x: 0,
    y: 0,
    travelLog: [] // after each move, (x;y)-1 will be push in the array in an object 
};

// ====================== to turn

function turnLeft(rover){
    switch (rover.direction) {
        case "N": 
            rover.direction = "W";
            // Bonus : try to find an other function which write this console.log for turnRight function too...
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

function turnRight(rover){
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

function moveForward(rover){
    switch (rover.direction) {
        case "N": 
            rover.y--;
            break;
        case "E": 
            rover.x++;
            break;
        case "S": 
            rover.y++;
            break;
        case "W": 
            rover.x--;
            break;
        default: console.log("Enter a right direction");
            break;
    }
    console.log(`moveForward was called ! The rover is now at x:${rover.x} and y:${rover.y}`);
    rover.travelLog.push(rover.x, rover.y); // push in travelLog array, the last coordonates x & y
}

//test the moveForward function : OK
// moveForward(rover); 

/* whereToMove is a parameter which is a string of letters either f,r or l. 
This parameter has to be converted to an array and each letter will be executed by an associated function(s) */
function commands (whereToMove){
    let separateMoves = [];  // method .split() could be use to avoid the 4 lines below ?
    rover.travelLog.push(rover.x, rover.y); // fills in the travelLog with the path (maybe is an other way to display the coordonates ? 2 by 2 to see each moves...set each pair of coordonates in an object ?)
    for (i = 0; i < whereToMove.length; i++){ // whereToMove.length = 3
        let move = whereToMove.charAt(i);
        separateMoves.push(move);
        //console.log(separateMoves); check if the array fills up
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
            default: console.log("This is not a right direction");
                break;
        }
    } 
    console.log(rover.travelLog);      
}


//commands("rff");

