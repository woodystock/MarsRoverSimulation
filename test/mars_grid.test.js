const { DIRECTION } = require("../src/compass_direction");
const { createGrid, addRover, gridCoordsOutOfBounds, gridCoordsOccupied } = require("../src/mars_grid");

describe("Grid creation:",() => {
    test.each([
        [6,6],
        [5,2],
        [1,1]
    ])("a grid of %i x %i", (width,height) => {

        //act
        const grid = createGrid(width,height);

        //assert
        expect(grid).toEqual({width,height});
    });
});

describe("Checking if coords are out of bounds:",() => {

    let grid;

    beforeEach(() => {
        grid = createGrid(6,6);
    });


    test.each([
        [1,1,false],
        [6,6,false],
        [0,0,false],
        [-1,1,true],
        [1,-1,true],
        [10,1,true],
        [1,10,true],
        [10,10,true]
    ])('coord [%i, %i] to be %s', (x,y,isInvalid) => {

        //act
        const result = gridCoordsOutOfBounds(grid,x,y);

        //assert
        expect(result).toBe(isInvalid);
    });
});

describe("Adding rovers to a 6x6 grid:",() => {

    let grid;

    beforeEach(() => {
        grid = createGrid(6,6);
    });

    test.each([
        [1,2,"N"],
        [4,4,"S"]
    ])("at %i , %i looking %s", (x,y,direction) => {

        //act
        const rover = addRover(grid,x,y,direction)

        //assert
        expect(rover).toEqual({type:"rover",x:x,y:y,direction:direction});
        expect(grid).toEqual({
            width:6,
            height:6,
            contents:[rover]
        });
    });
});

describe("Checking if coords are already occupied:",() => {

    let grid;

    beforeEach(() => {
        grid = createGrid(6,6);
        addRover(grid,1,2,"N");
        addRover(grid,4,2,"S");
    });


    test.each([
        [1,1,false],
        [6,6,false],
        [0,0,false],
        [1,2,true],
        [4,2,true],
        [10,10,false]
    ])('coord [%i, %i] to be %s', (x,y,isInvalid) => {

        //act
        const result = gridCoordsOccupied(grid,x,y);

        //assert
        expect(result).toBe(isInvalid);
    });
});


describe("Adding invalid rovers:",() => {

    test("adding a rover out of bounds", () => {

        //arrange
        const grid = createGrid(3,3);

        //act
        const rover = addRover(grid,4,4,"N");

        //assert
        expect(rover).toBeFalsy()
        expect(grid).toEqual({
            width:3,
            height:3
        });
    });

    test("adding a rover twice", () => {

        //arrange
        const grid = createGrid(3,3);

        //act
        const rover1 = addRover(grid,1,1,"N");
        const rover2 = addRover(grid,1,1,"S");

        //assert
        expect(rover1).toEqual({type:"rover",x:1,y:1,direction:"N"})
        expect(rover2).toBeFalsy()
        expect(grid).toEqual({
            width:3,
            height:3,
            contents:[rover1]
        });
    });
});