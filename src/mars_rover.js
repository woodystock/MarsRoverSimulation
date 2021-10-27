const TYPE_ROVER = "rover";

/**
 * Create a rover, with type: "rover", x, y, and postion.
 * @param {number} x 
 * @param {number} y 
 * @param {[NWSE]} direction 
 * @returns a new rover object
 */
const createRover = (x,y,direction) => {
    return {
        type: TYPE_ROVER,
        x,
        y,
        direction
    }
}

module.exports = {
    createRover
}