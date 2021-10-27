const { createGrid, addRover } = require("./mars_grid");

const marsRoverConsoleInputs = ( ...inputs) => {

    const outputs = [];
    if(inputs.length > 0)
    {
        const gridInput = inputs.shift();
        // first command
        if(validateGridInput(gridInput)) {
            
            const gridSize = gridInput.split(" ");
            const grid = createGrid(gridSize[0], gridSize[1]);

            while(inputs.length > 0) {
                const roverInput = inputs.shift();

                if(validateRoverInput(roverInput)){
                    const roverPosition = roverInput.split(" ");

                    addRover(grid,roverPosition[0],roverPosition[1],roverPosition[2]);

                    if(inputs.length > 0)
                    {
                        const pathInput = inputs.shift();

                        if(validatePathInput(pathInput)) {

                        }
                    }
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
    validatePathInput
}