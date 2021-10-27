const { mars_log } = require("./mars_log");
const { createRover } = require("./mars_rover");
/**
 * A function to create a plateau on mars for rovers to move about on.
 * 
 * @param  {} width - the width of the plateau ( >0 )
 * @param  {} height - the height of the plateau ( >0 )
 */
const createGrid = (width,height) => {
    if(isNaN(width) || isNaN(height))       throw new Error("width and height (as numbers) are required");
    if(width <= 0 || height <= 0)           throw new Error("width and height must be greater than 0")

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