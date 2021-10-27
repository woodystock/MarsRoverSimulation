const { DIRECTION } = require("../src/compass_direction");
const { createRover } = require("../src/mars_rover");

describe("Rover creation:",() => {
    test("create a rover at 1 2 with direction north", () => {
        //arrange
        const x = 1;
        const y = 2;

        //act
        const rover = createRover(x, y, DIRECTION.NORTH);

        //assert
        expect(rover).toEqual({type:"rover",x:x,y:y,direction:DIRECTION.NORTH});
    })
    
});