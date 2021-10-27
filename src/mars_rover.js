const TYPE_ROVER = "rover";


const createRover = (x,y,direction) => {
    return {
        type: TYPE_ROVER,
        x,
        y,
        direction
    }
}

module.exports = {
    createRover
}