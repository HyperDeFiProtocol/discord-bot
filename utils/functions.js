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

async function importFranc() {
    const franc = await import('franc')
    return franc.franc
}

async function importFrancAll() {
    const franc = await import('franc')
    return franc.francAll
}

module.exports = {
    wait: wait,
    importFranc: importFranc,
    importFrancAll: importFrancAll,
}
