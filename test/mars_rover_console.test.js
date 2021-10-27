const { validateGridInput, validateRoverInput } = require("../src/mars_rover_console");

describe("validateGridInput():",() => {
    test.each([
        ["5 5", true],
        ["10 10", true],
        ["fred", false],
        ["10 10 10", false],
        ["1", false],
        ["5 5fred",false],
        ["-5 -5", false],
        ["5,5", false],
        ["grid 5 5", false]
    ]) ('validate "%s" as %s', (input, isValid) => {

        //act
        const result = validateGridInput(input)

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