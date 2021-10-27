const { DIRECTION, DIRECTION_MODIFIER } = require("./compass_direction")
const { getPlateauContent, plateauCoordsOutOfBounds, plateauCoordsOccupied } = require("./mars_plateau");
const { mars_log } = require("./mars_log");

/**
 * A fucntion that iterates through a path string and instigates instructions to the given rover on the given plateau
 * 
 * @param {obj} plateau 
 * @param {number} roverIndex 
 * @param {Array} path 
 * @returns true if the path was completed succesffully
 */
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

/**
 * Move the given rover forward one on the given plateau. This is based on the rovers current direction.
 * @param {obj} plateau 
 * @param {number} roverIndex 
 * @returns true if the rover was able to move
 */
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

/**
 * Returns an obj {x,y} of the next coordinates given the current coords and direction.
 * @param {number} x 
 * @param {number} y 
 * @param {[NSWE]} direction 
 * @returns {obj} - {x,y} coords of the next space
 */
const getNextCoords = (x, y, direction) => {
    const directionModifier = DIRECTION_MODIFIER[direction];

    return {x:x + directionModifier.x, y:y + directionModifier.y}
} 

/**
 * Turn a rover 90 degrees left on the compass
 * @param {obj} rover 
 * @returns {obj} rover which was turned
 */
const turnRoverLeft = (rover) => {
    const directionOrder = Object.values(DIRECTION);
    const dirIndex = directionOrder.indexOf(rover.direction);

    if( dirIndex != -1)
        rover.direction = directionOrder[dirIndex === 0 ? 3 : dirIndex - 1];

    return rover;
}

/**
 * Turn a rover 90 degreess right on the compass
 * @param {obj} rover 
 * @returns {obj} rover which was turned
 */
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