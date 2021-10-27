const { DIRECTION, DIRECTION_MODIFIER } = require("./compass_direction")
const { getPlateauContent, plateauCoordsOutOfBounds, plateauCoordsOccupied } = require("./mars_plateau");
const { mars_log } = require("./mars_log");

const navigateRoverPath = (plateau,roverIndex,path) => {
    const rover = getPlateauContent(plateau,roverIndex);

    for(const instruction of path) {
        if(instruction === "L") turnRoverLeft(rover);
        else if(instruction === "R") turnRoverRight(rover);
        else if(instruction === "M") {
            if(! advanceRover(plateau,roverIndex)) {
                return false;
            }
        }
    }

    return true;
}

const advanceRover = (plateau,roverIndex) => {
    const rover = getPlateauContent(plateau,roverIndex);

    const nextCoords = getNextCoords(rover.x, rover.y, rover.direction); 

    if(plateauCoordsOutOfBounds(plateau,nextCoords.x, nextCoords.y)) {
        mars_log("unable to advance rover","rover would move out of bounds");
        return false;
    }

    if(plateauCoordsOccupied(plateau,nextCoords.x,nextCoords.y)) {
        mars_log("unable to advance rover","plateau space already occupied");
        return false;
    }

    rover.x = nextCoords.x;
    rover.y = nextCoords.y;

    return true;
}

const getNextCoords = (x, y, direction) => {
    const directionModifier = DIRECTION_MODIFIER[direction];

    return {x:x + directionModifier.x, y:y + directionModifier.y}
} 

const turnRoverLeft = (rover) => {
    const directionOrder = Object.values(DIRECTION);
    const dirIndex = directionOrder.indexOf(rover.direction);

    if( dirIndex != -1)
        rover.direction = directionOrder[dirIndex === 0 ? 3 : dirIndex - 1];

    return rover;
}

const turnRoverRight = (rover) => {
    const directionOrder = Object.values(DIRECTION);
    const dirIndex = directionOrder.indexOf(rover.direction);

    if( dirIndex != -1)
        rover.direction = directionOrder[dirIndex === 3 ? 0 : dirIndex + 1];

    return rover;
}

module.exports = {
    navigateRoverPath,
    getNextCoords,
    advanceRover,
    turnRoverLeft,
    turnRoverRight
}