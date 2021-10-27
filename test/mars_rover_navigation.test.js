const { addRover, getGridContent, createGrid } = require("../src/mars_grid");
const { showMarsLogs } = require("../src/mars_log");
const { createRover } = require("../src/mars_rover");
const { turnRoverRight, turnRoverLeft, advanceRover, getNextCoords } = require("../src/mars_rover_naviagtion");

showMarsLogs(false);

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

describe("getNextCoords:",() => {

    test.each([
        [1,1,"N",1,2],
        [2,2,"S",2,1],
        [4,1,"W",3,1],
        [4,6,"E",5,6]
    ])("starting at [%i, %i] looking %s, nextCoords are [%i, %i]", (startX,startY,direction,endX, endY) => {


        //act
        const newCoords = getNextCoords(startX, startY, direction);

        //assert
        expect(newCoords).toEqual([endX,endY]);
    });
});

/*
describe("advance rover:",() => {

    let grid;
    
    beforeEach(() => {
        grid = createGrid(6,6);
    });

    test.each([
        ["N",2,3],
        ["S",2,1],
        ["W",3,2],
        ["E",1,2]
    ])("starting at [2, 2] looking %s, advance 1 to [%i, %i]", (startDirection,endX, endY) => {

        //arrange
        const roverIndex = addRover(grid,2,2,startDirection);
        const rover = getGridContent(grid, roverIndex);

        //act
        advanceRover(grid, roverIndex);

        //assert
        expect(rover).toEqual({type:"rover",x:endX,y:endY,direction:startDirection});
    });
});*/