const { createGrid } = require("../src/marsgrid");

test("create a grid of 6 x 6", () => {
    //arrange
    const width = 6;
    const height = 6;

    //act
    const grid = createGrid(6,6);

    //assert
    expect(grid).toEqual({width,height});

});