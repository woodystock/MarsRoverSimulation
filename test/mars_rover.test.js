const { showMarsLogs } = require("../src/mars_log");
const { createRover } = require("../src/mars_rover");

showMarsLogs(false);

describe("createRover():",() => {
    test.each([
        [1,2,"N"],
        [4,4,"W"],
        [0,0,"S"],
        [6,6,"W"]
    ]) ('rover at: %i %i facing %s', (x,y, direction) => {

        //act
        const rover = createRover(x, y, direction);

        //assert
        expect(rover).toEqual({type:"rover",x:x,y:y,direction:direction});
    })
});