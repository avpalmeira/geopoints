const neatCsv = require('neat-csv');
const fs = require('fs');

const readCsv = (filePath) => {
  fs.readFile(filePath, async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(await neatCsv(data));
  });
}

module.exports = { readCsv }
