const { DIRECTION } = require("../src/compass_direction");
const { createGrid, addRover } = require("../src/mars_grid");

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