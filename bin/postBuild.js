const fs = require('fs');
const path = require('path');
const minmist = require('minimist');

let filePath = path.resolve(__dirname, '../scripts/postwoman.bundle.js');
let newText = `var _postwoman_ = {};\n
var _Postwoman_ = {};\n
var _serializer = {};\n
var __VERSION__ = "${new Date().toISOString()}";`;

function makePostwomanIsGlobal() {
    const params = minmist(process.argv);
    const { mode } = params;
    if (mode === 'production') {
        filePath = path.resolve(__dirname, '../scripts/postwoman.min.js');
    }
    if (mode == 'development') {
        newText += `var pm = {};\nvar _plainPostwoman_ = {};\n`;
    }
    newText += `var __ENV__ = "${mode}";\n`;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const updatedContent = `${newText} ${data}`;

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

makePostwomanIsGlobal();
