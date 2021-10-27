const { createRover } = require("./marsrover");

const createGrid = (width,height) => {
    return {
        width,
        height
    }
};

const addRover = (grid,x,y,direction) => {
    if(!validateGridCoords(grid, {x,y})) {
        log("rover not added", "coords for rover out of bounds")
        return;
    }
    if(!gridPostionEmpty(grid,x,y)) {
        log("rover not added", "coords for rover already occupied");
        return;
    }

    const rover = createRover(x,y,direction);

    grid.contents ? grid.contents.push(rover) : grid.contents = [rover];

    return rover;
}

function validateGridCoords(grid, x, y) {
    return x >= 0 && y >= 0 && x < grid.width && y < grid.height;
}

function gridPostionEmpty(grid, x, y) {
    return grid.contents?.some( item => item.x == x || item.y == y);
}


module.exports = {
    createGrid,
    addRover
}