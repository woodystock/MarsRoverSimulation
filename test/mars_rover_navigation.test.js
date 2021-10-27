const { addRover, getGridContent, createGrid } = require("../src/mars_grid");
const { showMarsLogs } = require("../src/mars_log");
const { createRover } = require("../src/mars_rover");
const { turnRoverRight, turnRoverLeft, advanceRover, getNextCoords } = require("../src/mars_rover_naviagtion");

showMarsLogs(false);

describe("turnRoverRight():",() => {
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

describe("turnRoverLeft():",() => {
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

describe("getNextCoords():",() => {

    test.each([
        [1,1,"N",1,2],
        [2,2,"S",2,1],
        [4,1,"W",3,1],
        [4,6,"E",5,6]
    ])("starting at [%i, %i] looking %s, nextCoords are [%i, %i]", (startX,startY,direction,endX, endY) => {


        //act
        const newCoords = getNextCoords(startX, startY, direction);

        //assert
        expect(newCoords).toEqual({x:endX,y:endY});
    });
});


describe("advanceRover():",() => {

    let grid;
    
    beforeEach(() => {
        grid = createGrid(6,6);
    });

    test.each([
        ["N",2,3],
        ["S",2,1],
        ["W",1,2],
        ["E",3,2]
    ])("starting at [2, 2] looking %s, advance 1 to [%i, %i]", (direction,endX, endY) => {

        //arrange
        const roverIndex = addRover(grid,2,2,direction);
        const rover = getGridContent(grid, roverIndex);

        //act
        const result = advanceRover(grid, roverIndex);

        //assert
        expect(result).toBe(true);
        expect(rover).toEqual({type:"rover",x:endX,y:endY,direction:direction});
    });

    test.each([
        [6,6,"N"],
        [6,0,"S"],
        [0,6,"W"],
        [6,6,"E"]
    ])("starting at [%i,%i] looking %s, do not advance out of bounds", (startX,startY,direction) => {

    //arrange
    const roverIndex = addRover(grid,startX,startY,direction);
    const rover = getGridContent(grid, roverIndex);

    //act
    const result = advanceRover(grid, roverIndex);

    //assert
    expect(result).toBe(false);
    expect(rover).toEqual({type:"rover",x:startX,y:startY,direction:direction});

    });

    test("rover1 at [2,2] looking N, and rover2 at [2,3] looking N, rover1 cannot advance", () => {

        //arange
        const rover1Index = addRover(grid,2,2,"N");
        const rover2Index = addRover(grid,2,3,"N");

        const rover1 = getGridContent(grid,rover1Index);

        const result = advanceRover(grid, rover1Index);

        expect(result).toBe(false);
        expect(rover1).toEqual({type:"rover",x:2,y:2,direction:"N"});
    });
});