
const DIRECTION = {
    NORTH: "N",
    EAST: "E",
    SOUTH: "S",
    WEST: "W",
}


const DIRECTION_MODIFIER = {
    N: {x:0,y:1},
    E: {x:1,y:0},
    S: {x:0,y:-1},
    W: {x:-1,y:0}
}

module.exports = {
    DIRECTION,
    DIRECTION_MODIFIER
}