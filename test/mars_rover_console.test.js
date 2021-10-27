const { validatePlateauInput, validateRoverInput, validatePathInput, handleMarsRoverConsoleInputs, handlePlateauInput, handleRoverInput, handlePathInput } = require("../src/mars_rover_console");

describe("validatePlateauInput():",() => {
    test.each([
        ["5 5", true],
        ["10 10", true],
        ["fred", false],
        ["10 10 10", false],
        ["1", false],
        ["5 5fred",false],
        ["-5 -5", false],
        ["5,5", false],
        ["plateau 5 5", false]
    ]) ('validate "%s" as %s', (input, isValid) => {

        //act
        const result = validatePlateauInput(input)

        //assert
        expect(result).toBe(isValid);
    })
});

describe("validateRoverInput():",() => {
    test.each([
        ["1 1 N", true],
        ["1 1 G", false],
        ["10 10 S", true],
        ["fred", false],
        ["10 10 10", false],
        ["1", false],
        ["5 5fred S",false],
        ["-5 -5 W", false],
        ["5,5", false],
        ["rover N 5 5", false]
    ]) ('validate "%s" as %s', (input, isValid) => {

        //act
        const result = validateRoverInput(input);

        //assert
        expect(result).toBe(isValid);
    })
});

describe("validatePathInput():",() => {
    test.each([
        ["M", true],
        ["L", true],
        ["R", true],
        ["MLR", true],
        ["RLMMR", true],
        ["MVELEFT", false],
        ["123",false],
        ["M L R R", false],
        ["MMMMMMMMMMMMMT", false]
    ]) ('validate "%s" as %s', (input, isValid) => {

        //act
        const result = validatePathInput(input);

        //assert
        expect(result).toBe(isValid);
    })
});

describe("marsRoverConsoleInputs()", () => {
    test.each([
        [["5 5","1 2 N"],[]],
        [["5 5","1 2 N","MM"], ["1 4 N"]],
        [["5 5","1 2 N","MRM"], ["2 3 E"]],
        [["5 5","1 2 N","LMLMLMLMM"], ["1 3 N"]],
        [["5 5","1 2 N","M", "3 3 E"], ["1 3 N"]],
        [["5 5","1 2 N","M", "3 3 E", "M"], ["1 3 N","4 3 E"]],
        [["5 5","1 2 N","LMLMLMLMM", "3 3 E", "MMRMMRMRRM"], ["1 3 N","5 1 E"]]
    ])("inputs: %s => outputs: %s", (inputs, outputs) => {

        //act
        const result = handleMarsRoverConsoleInputs(...inputs);

        //assert
        expect(result).toEqual(outputs);
    });
});

describe("control the program using manual functions", () => {
    test("5 5 . 1 2 N . LMLMLMLMM . 3 3 E . MMRMMRMRRM => 1 3 N . 5 1 E", () => {
        //arrange
        const plateau = handlePlateauInput("5 5");
        //act
        const rover1Index = handleRoverInput(plateau, "1 2 N");
        const output1 = handlePathInput(plateau,rover1Index, "LMLMLMLMM");
        
        const rover2Index = handleRoverInput(plateau, "3 3 E");
        const output2 = handlePathInput(plateau,rover2Index, "MMRMMRMRRM");
        

        //assert
        expect(output1).toBe("1 3 N");
        expect(output2).toBe("5 1 E")
    });
});