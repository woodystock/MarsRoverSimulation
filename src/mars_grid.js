const { mars_log } = require("./mars_log");
const { createRover } = require("./mars_rover");

const createGrid = (width,height) => {
    return {
        width,
        height
    }
};

const addRover = (grid,x,y,direction) => {
    if(gridCoordsOutOfBounds(grid, x,y)) {
        mars_log("rover not added", "coords for rover out of bounds")
        return;
    }
    if(gridCoordsOccupied(grid,x,y)) { 
        mars_log("rover not added", "coords for rover already occupied");
        return;
    }

    const rover = createRover(x,y,direction);

    grid.contents ? grid.contents.push(rover) : grid.contents = [rover];

    return rover;
}

function gridCoordsOutOfBounds(grid, x, y) {
    return x < 0 || y < 0 || x > grid.width || y > grid.height;
}

function gridCoordsOccupied(grid, x, y) {
    return grid.contents?.some( item => item.x == x && item.y == y);
}


module.exports = {
    createGrid,
    addRover,
    gridCoordsOutOfBounds,
    gridCoordsOccupied
}