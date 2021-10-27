let _showLogs = true;

const mars_log = (...msgs) => {
    if(_showLogs)
        console.log(msgs.join("\n    => "));
}


module.exports = {
    mars_log
}