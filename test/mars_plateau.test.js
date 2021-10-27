const { createPlateau, addRover, plateauCoordsOutOfBounds, plateauCoordsOccupied, getPlateauContent } = require("../src/mars_plateau");

describe("createPlateau():",() => {
    test.each([
        [6,6],
        [5,2],
        [1,1]
    ])("a plateau of %i x %i", (width,height) => {

        //act
        const plateau = createPlateau(width,height);

        //assert
        expect(plateau).toEqual({width,height,contents:[]});
    });
});

describe("plateauCoordsOutOfBounds():",() => {

    let plateau;

    beforeEach(() => {
        plateau = createPlateau(6,6);
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
        const result = plateauCoordsOutOfBounds(plateau,x,y);

        //assert
        expect(result).toBe(isInvalid);
    });
});

describe("addRover():",() => {

    let plateau;

    beforeEach(() => {
        plateau = createPlateau(6,6);
    });

    test.each([
        [1,2,"N"],
        [4,4,"S"]
    ])("at %i , %i looking %s", (x,y,direction) => {

        //act
        const roverIndex = addRover(plateau,x,y,direction)
        const rover = getPlateauContent(plateau,roverIndex);

        //assert
        expect(rover).toEqual({type:"rover",x:x,y:y,direction:direction});
        expect(plateau).toEqual({
            width:6,
            height:6,
            contents:[rover]
        });
    });
});

describe("Checking if coords are already occupied:",() => {

    let plateau;

    beforeEach(() => {
        plateau = createPlateau(6,6);
        addRover(plateau,1,2,"N");
        addRover(plateau,4,2,"S");
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
        const result = plateauCoordsOccupied(plateau,x,y);

        //assert
        expect(result).toBe(isInvalid);
    });
});


describe("addRover() - validation:",() => {

    test("cannot add rover out of bounds", () => {

        //arrange
        const plateau = createPlateau(3,3);

        //act
        const roverIndex = addRover(plateau,4,4,"N");
        const rover = getPlateauContent(plateau, roverIndex);

        //assert
        expect(rover).toBeFalsy()
        expect(plateau).toEqual({
            width:3,
            height:3,
            contents:[]
        });
    });

    test("cannot add rover to the same space", () => {

        //arrange
        const plateau = createPlateau(3,3);

        //act
        const rover1Index = addRover(plateau,1,1,"N");
        const rover2Index = addRover(plateau,1,1,"S");

        const rover1 = getPlateauContent(plateau,rover1Index);
        const rover2 = getPlateauContent(plateau,rover2Index);

        //assert
        expect(rover1).toEqual({type:"rover",x:1,y:1,direction:"N"})
        expect(rover2).toBeFalsy()
        expect(plateau).toEqual({
            width:3,
            height:3,
            contents:[rover1]
        });
    });
});