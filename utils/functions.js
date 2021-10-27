const wait = function(timeout = 1000) {
    return new Promise((resolve, reject) => {
        if (timeout > 0) {
            setTimeout(() => {
                resolve(timeout)
            }, timeout)
        } else {
            reject('Invalid `timeout`')
        }
    })
}

module.exports = {
    wait: wait
}