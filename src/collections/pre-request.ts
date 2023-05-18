import 'postman-sandbox/types/sandbox/prerequest';
import 'postman-sandbox/types/sandbox/test';
import 'postman-collection/types';
import 'postman-sandbox/types';

pm.sendRequest(
    'https://raw.githubusercontent.com/lehaiquantb/postman/main/scripts/lib.bundle.js',
    function (err, res) {
        console.log('err', err);
        if (!err) {
            const scriptText = res?.text();
            if (typeof scriptText === 'string' && scriptText?.length) {
                eval(scriptText);
            }
            console.log('res', scriptText.length);
        }
    },
);

const Utils = {};
const _Faker = {
    email: function () {
        pm.variables.replaceIn('{{$randomEmail}}');
    },
};

// @ts-ignore
Faker = _Faker;
