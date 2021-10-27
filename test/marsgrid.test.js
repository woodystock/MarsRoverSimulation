const { createGrid, addRover } = require("../src/marsgrid");

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

// describe("Adding rovers:",() => {
//     test("create a grid of 6 x 6 and add a rover at 1 , 2 looking N", () => {
//         //arrange
//         const grid = createGrid(width,height);

//         //act
//         const rover = addRover(grid,1,2,DIRECTION.NORTH)

//         //assert
//         expect(grid.contents).toEqual({rover});

//     })
// });