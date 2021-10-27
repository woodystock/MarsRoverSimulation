let _showLogs = true;

const mars_log = (...msgs) => {
    if(_showLogs)
        console.log(msgs.join("\n    => "));
}

const showMarsLogs = (show) => {
    _showLogs = show;
}

module.exports = {
    mars_log,
    showMarsLogs
}