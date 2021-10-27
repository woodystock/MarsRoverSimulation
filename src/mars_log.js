const mars_log = (...msgs) => {
    console.log(msgs.join("\n    => "));
}

module.exports = {
    mars_log
}