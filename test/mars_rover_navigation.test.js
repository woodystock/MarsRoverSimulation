const { createRover } = require("../src/mars_rover");
const { turnRoverRight, turnRoverLeft } = require("../src/mars_rover_naviagtion");

describe("turn rover right:",() => {
    test.each([
        ["N","E"],
        ["E","S"],
        ["S","W"],
        ["W","N"]
    ])("begin looking %s. End looking %s", (startDirection,endDirection) => {

        //arrange
        const rover = createRover(0,0,startDirection);

        //act
        turnRoverRight(rover);

        //assert
        expect(rover.direction).toEqual(endDirection);
    });
});

describe("turn rover left:",() => {
    test.each([
        ["N","W"],
        ["W","S"],
        ["S","E"],
        ["E","N"]
    ])("begin looking %s. End looking %s", (startDirection,endDirection) => {

        //arrange
        const rover = createRover(0,0,startDirection);

        //act
        turnRoverLeft(rover);

        //assert
        expect(rover.direction).toEqual(endDirection);
    });
});

describe("advance rover:",() => {
    test.each([
        ["N","W"],
        ["W","S"],
        ["S","E"],
        ["E","N"]
    ])("begin looking %s. End looking %s", (startDirection,endDirection) => {

        //arrange
        const rover = createRover(0,0,startDirection);

        //act
        turnRoverLeft(rover);

        //assert
        expect(rover.direction).toEqual(endDirection);
    });
});