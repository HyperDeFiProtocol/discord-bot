const { program } = require('commander')
const appInfo = require('../package.json')

program
    .version(appInfo.version)
    .option('-N, --network <string>', 'network', 'alpha')

program.parse();

module.exports = program.opts();
