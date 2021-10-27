/**
 * An 'Enum' to help identify compass direactions
 */
const DIRECTION = {
    NORTH: "N",
    EAST: "E",
    SOUTH: "S",
    WEST: "W",
}

/**
 * A lookup to help with adjust coords due to compass direction
 */
const DIRECTION_MODIFIER = {
    N: {x:0,y:1},
    E: {x:1,y:0},
    S: {x:0,y:-1},
    W: {x:-1,y:0}
}

/**
 * Returns true if the given direction has a representation
 */
const isValidDirection = (direction) => Object.values(DIRECTION).includes(direction);

module.exports = {
    DIRECTION,
    DIRECTION_MODIFIER,
    isValidDirection
}