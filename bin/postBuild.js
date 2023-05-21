const fs = require('fs');
const path = require('path');
const minmist = require('minimist');

let filePath = path.resolve(__dirname, '../scripts/postman.bundle.js');
const newText = 'var _Postman_ = {};\n';

function makePostmanIsGlobal() {
    const params = minmist(process.argv);
    const { mode } = params;
    if (mode === 'production') {
        filePath = path.resolve(__dirname, '../scripts/postman.min.js');
    }
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

            console.log(
                'Text added to the beginning of the file successfully.',
            );
        });
    });
}

makePostmanIsGlobal();
