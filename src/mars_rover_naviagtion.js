const { DIRECTION } = require("./compass_direction")
const { getGridContent } = require("./mars_grid")

const navigateRoverPath = (grid,rover,path) => {

}

const advanceRover = (grid,roverIndex) => {
    const rover = getGridContent(roverIndex);

    
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
    advanceRover,
    turnRoverLeft,
    turnRoverRight
}