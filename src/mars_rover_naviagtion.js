const { DIRECTION } = require("./compass_direction")

const navigateRoverPath = (grid,rover,path) => {

}

const moveRover = (rover,x,y) => {
    rover.x = x;
    rover.y = y;
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
    advanceRover: moveRover,
    turnRoverLeft,
    turnRoverRight
}