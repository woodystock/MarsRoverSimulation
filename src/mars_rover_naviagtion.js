const { DIRECTION, DIRECTION_MODIFIER } = require("./compass_direction")
const { getGridContent } = require("./mars_grid")

const navigateRoverPath = (grid,rover,path) => {

}

const advanceRover = (grid,roverIndex) => {
    const rover = getGridContent(roverIndex);


}

const getNextCoords = (x, y, direction) => {
    const directionModifier = DIRECTION_MODIFIER[direction];

    return [x + directionModifier.x, y + directionModifier.y]
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