let _showLogs = false;

/**
 * helper function to format logs throughout the program
 * @param  {...any} msgs list of messages, 1st one is a heading, the rest is the body
 */
const mars_log = (...msgs) => {
    if (_showLogs)
        console.log(msgs.join("\n    => "));
}


module.exports = {
    mars_log
}