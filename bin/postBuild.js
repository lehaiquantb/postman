const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../scripts/lib.bundle.js');
const newText = 'var Postman = {};\n';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const updatedContent = newText + data;

    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Text added to the beginning of the file successfully.');
    });
});
