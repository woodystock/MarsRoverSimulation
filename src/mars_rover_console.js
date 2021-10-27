const { createGrid, addRover, getGridContent } = require("./mars_grid");
const { navigateRoverPath } = require("./mars_rover_naviagtion");

const marsRoverConsoleInputs = ( ...inputs) => {

    const outputs = [];
    if(inputs.length > 0)
    {
        const gridInput = inputs.shift();
        if(validateGridInput(gridInput)) {
            
            const gridSize = gridInput.split(" ");
            const grid = createGrid(Number(gridSize[0]), Number(gridSize[1]));

            while(inputs.length > 0) {
                const roverInput = inputs.shift();

                if(validateRoverInput(roverInput)){
                    const roverPosition = roverInput.split(" ");

                    const currentRoverIndex = addRover(grid,Number(roverPosition[0]),Number(roverPosition[1]),roverPosition[2]);

                    if(inputs.length > 0)
                    {
                        const pathInput = inputs.shift();

                        if(validatePathInput(pathInput)) {
                            navigateRoverPath(grid, currentRoverIndex,pathInput);
                        }
                    }
                    const rover = getGridContent(grid, currentRoverIndex);
                    outputs.push(rover.x + " " + rover.y + " " + rover.direction);
                }
                else throw new Error("invalid rover input sent to mars rover console");
            }
        }
        else throw new Error("invalid grid input sent to mars rover console");
    }

    return outputs;
}

const validateGridInput = (input) => RegExp(/^[0-9]* [0-9]*$/).test(input);
const validateRoverInput = (input) => RegExp(/^[0-9]* [0-9]* [NWSE]$/).test(input);
const validatePathInput = (input) => RegExp(/^[LRM]*$/).test(input);


module.exports = {
    validateGridInput,
    validateRoverInput,
    validatePathInput,
    marsRoverConsoleInputs
}