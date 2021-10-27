const { createPlateau, addRover, getPlateauContent } = require("./mars_plateau");
const { navigateRoverPath } = require("./mars_rover_naviagtion");

/**
 * A handler for a list of inputs to the program.
 * 
 * The first input initialises the plateau. e.g. the input
 *  = > 5 5
 * would create a plateau that has a top right position of 5 x 5 (so its size would be 6 x 6 including 0)
 * 
 * The next input initialse a rover's position and direction. e.g. the input
 *  = > 1 2 N
 * would place a rover at postition [1,2] facing north.
 * 
 * The next input wold give that robot a movement path of a combination of M for move, L for turn left and R for turn right. e.g. the input
 *  = > RML
 * Would turn the robot right, move it forward one on the plateau, and then turn it left.
 * 
 * Following inputs will be for more rovers to be placed on the plateau and moved using a path.
 * 
 * The function will return all final positions of the robots placed in the plateau.
 * 
 * @param  {...any} inputs - list of specific inputs. [grid_size],[rover_pos],[rover_path],[rover_pos],[rover_path]...
 * @returns {[outputs]} - list of final positions of the rovers
 */
const handleMarsRoverConsoleInputs = ( ...inputs) => {

    const outputs = [];
    if(inputs.length > 0)
    {
        const plateau = handlePlateauInput(inputs.shift());

        while(inputs.length > 0) {
            const roverIndex = handleRoverInput(plateau, inputs.shift());

            if(inputs.length > 0) {
                outputs.push(handlePathInput(plateau, roverIndex, inputs.shift()));
            }
        }
    }

    return outputs;
}


/**
 * handles a valid plateau input and returns a new plateau
 * @param {string} input - "width height" eg. 5 5
 * @returns {obj} - obj representing a plateau
 */
const handlePlateauInput = (input) => {
    if(validatePlateauInput(input)) {
        const plateauSize = input.split(" ");
        return createPlateau(Number(plateauSize[0]), Number(plateauSize[1]));
    } else throw new Error("invalid plateau input sent to mars rover console");
}


/**
 * handles a valid rover input and returns the content index of the new rover
 * @param {obj} plateau 
 * @param {string} input -"x y direction" eg. "1 2 N"
 * @returns {number} index of the rover inside the plateau contents
 */
const handleRoverInput = (plateau, input) => {
    if(validateRoverInput(input)) {
        const roverPosition = input.split(" ");
        return addRover(plateau,Number(roverPosition[0]),Number(roverPosition[1]),roverPosition[2]);
    } else throw new Error("invalid rover input sent to mars rover console");
}

/**
 * handles a valid rover input and returns a formatted string of the rovers ending position
 * @param {obj} plateau 
 * @param {string} input -"x y direction" eg. "1 2 N"
 * @returns {string} formatted string of the rovers ending position
 */
 const handlePathInput = (plateau, roverIndex, input) => {
    if(validatePathInput(input)) {
        navigateRoverPath(plateau, roverIndex,input);

        const rover = getPlateauContent(plateau,roverIndex);
        return rover.x + " " + rover.y + " " + rover.direction
    } else throw new Error("invalid path input sent to mars rover console");
} 


/**
 * validates if a plateau input matches the format "w h" where w = width and h = height
 * @param {string} input
 * @returns true if it is in a valid format
 */
const validatePlateauInput = (input) => RegExp(/^[0-9]* [0-9]*$/).test(input);


/**
 * validates if a rover input matches the format "x y d" where x is its starting x, y is its starting y and d is its starting direction
 * @param {*} input 
 * @returns true if it is in a valid format
 */
const validateRoverInput = (input) => RegExp(/^[0-9]* [0-9]* [NWSE]$/).test(input);


/**
 * validates that a path input only contains mixtures of L, M, and R"
 * @param {string} input 
 * @returns true if it is in a valid format
 */
const validatePathInput = (input) => RegExp(/^[LRM]*$/).test(input);


module.exports = {
    validatePlateauInput,
    validateRoverInput,
    validatePathInput,
    handleMarsRoverConsoleInputs
}