const { addRover, getPlateauContent, createPlateau } = require("../src/mars_plateau");
const { createRover } = require("../src/mars_rover");
const { turnRoverRight, turnRoverLeft, advanceRover, getNextCoords, navigateRoverPath } = require("../src/mars_rover_naviagtion");

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

    let plateau;
    
    beforeEach(() => {
        plateau = createPlateau(6,6);
    });

    test.each([
        ["N",2,3],
        ["S",2,1],
        ["W",1,2],
        ["E",3,2]
    ])("starting at [2, 2] looking %s, advance 1 to [%i, %i]", (direction,endX, endY) => {

        //arrange
        const roverIndex = addRover(plateau,2,2,direction);
        const rover = getPlateauContent(plateau, roverIndex);

        //act
        const result = advanceRover(plateau, roverIndex);

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
    const roverIndex = addRover(plateau,startX,startY,direction);
    const rover = getPlateauContent(plateau, roverIndex);

    //act
    const result = advanceRover(plateau, roverIndex);

    //assert
    expect(result).toBe(false);
    expect(rover).toEqual({type:"rover",x:startX,y:startY,direction:direction});

    });

    test("rover1 at [2,2] looking N, and rover2 at [2,3] looking N, rover1 cannot advance", () => {

        //arange
        const rover1Index = addRover(plateau,2,2,"N");
        const rover2Index = addRover(plateau,2,3,"N");

        const rover1 = getPlateauContent(plateau,rover1Index);

        const result = advanceRover(plateau, rover1Index);

        expect(result).toBe(false);
        expect(rover1).toEqual({type:"rover",x:2,y:2,direction:"N"});
    });
});

describe("navigateRoverPath():",() => {

    let plateau;
    
    beforeEach(() => {
        plateau = createPlateau(6,6);
    });

    test.each([
        [2,2,"N","M",2,3,"N"],
        [2,2,"W","R",2,2,"N"],
        [2,2,"S","L",2,2,"E"],
        [2,2,"N","RR",2,2,"S"],
        [2,2,"N","MMM",2,5,"N"],
        [2,2,"S","RMRM",1,3,"N"],
        [0,0,"E","MMMLMMML",3,3,"W"],
        [1,2,"N","LMLMLMLMM",1,3,"N"],
        [3,3,"E","MMRMMRMRRM",5,1,"E"]
    ])("starting at [%i, %i, %s], follow the path '%s' to get to [%i, %i, %s]", (startX,startY,startDirection,path,endX,endY,endDirection) => {

        //arrange
        const roverIndex = addRover(plateau,startX,startY,startDirection);
        const rover = getPlateauContent(plateau, roverIndex);

        //act
        const result = navigateRoverPath(plateau,roverIndex,path);

        //assert
        expect(result).toBe(true);
        expect(rover).toEqual({type:"rover",x:endX,y:endY,direction:endDirection});
    });

    test.each([
        [6,6,"N","M"],
        [6,0,"S","M"],
        [0,6,"E","RRM"],
        [6,6,"S","LM"]
    ])("starting at [%i,%i] looking %s, do not follow the path '%s' out of bounds", (startX,startY,direction,path) => {
        //arrange
        const roverIndex = addRover(plateau,startX,startY,direction);
        const rover = getPlateauContent(plateau, roverIndex);

        //act
        const result = navigateRoverPath(plateau,roverIndex,path);

        //assert
        expect(result).toBe(false);
        expect(rover.x).toBe(startX);
        expect(rover.y).toBe(startY);
    });

    test("rover1 at [1, 1, N], and rover2 at [2, 3, N] rover1 follows path 'MMRMMMMRMMR' but stops before moving into rover2", () => {
        //arrange
        const rover1Index = addRover(plateau,1,1,"N");
        const rover1 = getPlateauContent(plateau, rover1Index);
        const rover2Index = addRover(plateau,2,3,"N");


        //act
        const result = navigateRoverPath(plateau,rover1Index,"MMRMMMMRMMR");

        //assert
        expect(result).toBe(false);
        expect(rover1.x).toBe(1);
        expect(rover1.y).toBe(3);
        expect(rover1.direction).toBe("E");
    });
});