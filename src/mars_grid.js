const { mars_log } = require("./mars_log");
const { createRover } = require("./mars_rover");

const createGrid = (width,height) => {
    return {
        width,
        height,
        contents:[]
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

    

    return grid.contents.push(rover)-1;
}

const gridCoordsOutOfBounds = (grid, x, y) => x < 0 || y < 0 || x > grid.width || y > grid.height;

const gridCoordsOccupied = (grid, x, y) => grid.contents?.some( item => item.x == x && item.y == y);

const getGridContent = ( grid, contentIndex ) => grid.contents[contentIndex]


module.exports = {
    createGrid,
    addRover,
    gridCoordsOutOfBounds,
    gridCoordsOccupied,
    getGridContent
}