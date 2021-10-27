const { createPlateau, addRover, getPlateauContent } = require("./mars_plateau");
const { navigateRoverPath } = require("./mars_rover_naviagtion");

/**
 * A handler for a selection of inputs to the program.
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
        const plateauInput = inputs.shift();
        if(validatePlateauInput(plateauInput)) {

            const plateau = handlePlateauInput(plateauInput);
            
            while(inputs.length > 0) {
                const roverInput = inputs.shift();
                if(validateRoverInput(roverInput)){

                    const roverIndex = handleRoverInput(plateau, roverInput);

                    if(inputs.length > 0) {
                        const pathInput = inputs.shift();

                        if(validatePathInput(pathInput)) {
                            navigateRoverPath(plateau, roverIndex,pathInput);
                        }
                    }
                    
                    const rover = getPlateauContent(plateau, roverIndex);
                    outputs.push(rover.x + " " + rover.y + " " + rover.direction);
                }
                else throw new Error("invalid rover input sent to mars rover console");
            }
        }
        else throw new Error("invalid plateau input sent to mars rover console");
    }

    return outputs;
}


/**
 * handles a valid plateau input and returns a new plateau
 * @param {string} input - "width height" eg. 5 5
 * @returns {obj} - obj representing a plateau
 */
const handlePlateauInput = (input) => {
    const plateauSize = input.split(" ");
    return createPlateau(Number(plateauSize[0]), Number(plateauSize[1]));
}


/**
 * handles a valid rover input and returns the content index of the new rover
 * @param {obj} plateau 
 * @param {string} input -"x y direction" eg. "1 2 N"
 * @returns {number} index of the rover inside the plateau contents
 */
const handleRoverInput = (plateau, input) => {
    const roverPosition = input.split(" ");

    return addRover(plateau,Number(roverPosition[0]),Number(roverPosition[1]),roverPosition[2]);
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