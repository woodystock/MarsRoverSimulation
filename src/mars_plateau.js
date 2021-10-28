const { isValidDirection } = require("./compass_direction");
const { mars_log } = require("./mars_log");
const { createRover } = require("./mars_rover");


/**
 * A function to create a plateau on mars for rovers to move about on. 
 * The plateau contents of contents of all rovers currently inside it.
 * 
 * @param  {number} width - the desired width of the plateau ( >0 )
 * @param  {number} height - the desired height of the plateau ( >0 )
 * @returns {obj} - the new plateau
 */
const createPlateau = (width, height) => {
    if (isNaN(width) || isNaN(height)) throw new Error("width and height (as numbers) are required");
    if (width <= 0 || height <= 0) throw new Error("width and height must be greater than 0")

    return {
        width,
        height,
        contents: []
    }
};


/**
 * Create and add a rover to the given plateau
 * @param  {obj} plateau
 * @param  {number} x
 * @param  {number} y
 * @param  {[NSWE]} direction - direction the robot is facing
 * @returns {number} - index of rover in grids contents
 */
const addRover = (plateau, rover) => {
    if (!plateau) throw new Error("plateau is required");

    if (plateauCoordsOutOfBounds(plateau, rover.x, rover.y)) {
        mars_log("rover not added", "coords for rover out of bounds")
        return;
    }
    if (plateauCoordsOccupied(plateau, rover.x, rover.y)) {
        mars_log("rover not added", "coords for rover already occupied");
        return;
    }

    return plateau?.contents?.push(rover) - 1;
}


/**
 * Checks if the given coords are out of bounds of the given grid
 * @param {obj} plateau - the plateau to check
 * @param {number} x
 * @param {number} y 
 * @returns {boolean} is out of bounds
 */
const plateauCoordsOutOfBounds = (plateau, x, y) => x < 0 || y < 0 || x > plateau?.width || y > plateau?.height;


/**
 * Checks if the given coords are already occupied
 * @param {obj} plateau 
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean} are occupied
 */
const plateauCoordsOccupied = (plateau, x, y) => plateau?.contents?.some(item => item.x == x && item.y == y);


/**
 * Gets the item at the given index of the given plateau object
 * @param {*} plateau 
 * @param {*} contentIndex 
 * @returns {obj} item at the given index
 */
const getPlateauContent = (plateau, contentIndex) => plateau?.contents[contentIndex]


module.exports = {
    createPlateau,
    addRover,
    plateauCoordsOutOfBounds,
    plateauCoordsOccupied,
    getPlateauContent
}