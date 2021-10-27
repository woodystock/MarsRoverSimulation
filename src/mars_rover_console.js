const { createPlateau, addRover, getPlateauContent } = require("./mars_plateau");
const { navigateRoverPath } = require("./mars_rover_naviagtion");

const marsRoverConsoleInputs = ( ...inputs) => {

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

const handlePlateauInput = (input) => {
    const plateauSize = input.split(" ");
    return createPlateau(Number(plateauSize[0]), Number(plateauSize[1]));
}

const handleRoverInput = (plateau, input) => {
    const roverPosition = input.split(" ");

    return addRover(plateau,Number(roverPosition[0]),Number(roverPosition[1]),roverPosition[2]);
} 


const validatePlateauInput = (input) => RegExp(/^[0-9]* [0-9]*$/).test(input);
const validateRoverInput = (input) => RegExp(/^[0-9]* [0-9]* [NWSE]$/).test(input);
const validatePathInput = (input) => RegExp(/^[LRM]*$/).test(input);


module.exports = {
    validatePlateauInput,
    validateRoverInput,
    validatePathInput,
    marsRoverConsoleInputs
}