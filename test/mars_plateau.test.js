const { createPlateau, addRover, plateauCoordsOutOfBounds, plateauCoordsOccupied, getPlateauContent } = require("../src/mars_plateau");
const { createRover } = require("../src/mars_rover");

describe("createPlateau():", () => {
    test.each([
        [6, 6],
        [5, 2],
        [1, 1]
    ])("a plateau of %i x %i", (width, height) => {

        //act
        const plateau = createPlateau(width, height);

        //assert
        expect(plateau).toEqual({ width, height, contents: [] });
    });
});

describe("plateauCoordsOutOfBounds():", () => {

    let plateau;

    beforeEach(() => {
        plateau = createPlateau(6, 6);
    });


    test.each([
        [1, 1, false],
        [6, 6, false],
        [0, 0, false],
        [-1, 1, true],
        [1, -1, true],
        [10, 1, true],
        [1, 10, true],
        [10, 10, true]
    ])('coord [%i, %i] to be %s', (x, y, isInvalid) => {

        //act
        const result = plateauCoordsOutOfBounds(plateau, x, y);

        //assert
        expect(result).toBe(isInvalid);
    });
});

describe("addRover():", () => {

    let plateau;

    beforeEach(() => {
        plateau = createPlateau(6, 6);
    });

    test.each([
        [1, 2, "N"],
        [4, 4, "S"]
    ])("at %i , %i looking %s", (x, y, direction) => {

        //act
        const rover = createRover(x, y, direction);
        addRover(plateau, rover)

        //assert
        expect(rover).toEqual({ type: "rover", x: x, y: y, direction: direction });
        expect(plateau.contents).toEqual([rover]);
    });
});

describe("Checking if coords are already occupied:", () => {

    let plateau;

    beforeEach(() => {
        plateau = createPlateau(6, 6);
        addRover(plateau, createRover(1, 2, "N"));
        addRover(plateau, createRover(4, 2, "S"));
    });


    test.each([
        [1, 1, false],
        [6, 6, false],
        [0, 0, false],
        [1, 2, true],
        [4, 2, true],
        [10, 10, false]
    ])('coord [%i, %i] to be %s', (x, y, isInvalid) => {

        //act
        const result = plateauCoordsOccupied(plateau, x, y);

        //assert
        expect(result).toBe(isInvalid);
    });
});


describe("addRover() - validation:", () => {

    test("cannot add rover out of bounds", () => {

        //arrange
        const plateau = createPlateau(3, 3);
        const rover = createRover(4, 4, "N")

        //act
        addRover(plateau, rover);

        //assert
        expect(plateau).toEqual({
            width: 3,
            height: 3,
            contents: []
        });
    });

    test("cannot add rover to the same space", () => {

        //arrange
        const plateau = createPlateau(3, 3);
        const rover1 = createRover(1, 1, "N")
        const rover2 = createRover(1, 1, "S")

        //act
        addRover(plateau, rover1);
        addRover(plateau, rover2);

        //assert
        expect(rover1).toEqual({ type: "rover", x: 1, y: 1, direction: "N" })
        expect(plateau).toEqual({
            width: 3,
            height: 3,
            contents: [rover1]
        });
    });
});