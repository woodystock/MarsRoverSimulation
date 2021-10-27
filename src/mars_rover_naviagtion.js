const { DIRECTION, DIRECTION_MODIFIER } = require("./compass_direction")
const { getGridContent, gridCoordsOutOfBounds, gridCoordsOccupied } = require("./mars_grid");
const { mars_log } = require("./mars_log");

const navigateRoverPath = (grid,rover,path) => {

}

const advanceRover = (grid,roverIndex) => {
    const rover = getGridContent(grid,roverIndex);

    const nextCoords = getNextCoords(rover.x, rover.y, rover.direction); 

    if(gridCoordsOutOfBounds(grid,nextCoords.x, nextCoords.y)) {
        mars_log("unable to advance rover","rover would move out of bounds");
        return false;
    }

    if(gridCoordsOccupied(grid,nextCoords.x,nextCoords.y)) {
        mars_log("unable to advance rover","grid space already occupied");
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