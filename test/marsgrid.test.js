const { DIRECTION } = require("../src/compass_direction");
const { createGrid, addRover } = require("../src/mars_grid");

describe("Grid creation:",() => {
    test("create a grid of 6 x 6", () => {
        //arrange
        const width = 6;
        const height = 6;

        //act
        const grid = createGrid(width,height);

        //assert
        expect(grid).toEqual({width,height});

    })

    test("create a grid of 5 x 2", () => {
        //arrange
        const width = 5;
        const height = 2;

        //act
        const grid = createGrid(width,height);

        //assert
        expect(grid).toEqual({width,height});

    })
});

describe("Adding rovers:",() => {
    test("create a grid of 6 x 6 and add a rover at 1 , 2 looking N", () => {
        //arrange
        const grid = createGrid(6,6);

        //act
        const rover = addRover(grid,1,2,DIRECTION.NORTH)

        //assert
        expect(rover).toEqual({type:"rover",x:1,y:2,direction:DIRECTION.NORTH})
        expect(grid).toEqual({
            width:6,
            height:6,
            contents:[rover]
        });
    })
});