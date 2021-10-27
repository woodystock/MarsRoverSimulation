
const DIRECTION = {
    NORTH: "N",
    EAST: "E",
    SOUTH: "S",
    WEST: "W",
}

const DIRECTION_MOD = {
    N: [0,1],
    E: [1,0],
    S: [0,-1],
    W: [-1,0]
}

module.exports = {
    DIRECTION,
    DIRECTION_MOD
}