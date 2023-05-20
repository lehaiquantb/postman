import 'postman-sandbox/types/sandbox/prerequest';
import 'postman-sandbox/types/sandbox/test';
import 'postman-collection/types';
import 'postman-sandbox/types';

let scriptText;
const getPostmanScript = function () {
    return new Promise((resolve) => {
        pm.sendRequest(
            'https://raw.githubusercontent.com/lehaiquantb/postman/main/scripts/lib.bundle.js',
            function (err, res) {
                console.log('err', err);
                if (!err) {
                    scriptText = res?.text();
                    if (typeof scriptText === 'string' && scriptText?.length) {
                        resolve(scriptText);
                        return;
                    }
                }
                resolve(undefined);
            },
        );
    });
};
(async function () {
    scriptText = await getPostmanScript();
    if (typeof scriptText === 'string' && scriptText?.length) {
        eval(scriptText);
    }
})();

const Utils = {};
const _Faker = {
    email: function () {
        pm.variables.replaceIn('{{$randomEmail}}');
    },
};

// @ts-ignore
Faker = _Faker;
