import moment from 'moment';
import utils from '../utils/helper';
console.log('HELLO POSTMAN', moment().format('YYYY-MM-DD'));

const _Postman = {
    email: function () {
        pm.variables.replaceIn('{{$randomEmail}}');
    },
    moment,
    u: utils,
    m: moment,
};
console.log('XXXxx');
// console
// eval(`pm.globals.set('myGlobalVariable', _Faker)`);
// _.add(5, 5);
// this.Faker = _Faker;
// console.log(myGlobalVariable)
// export { _Faker };

// @ts-ignore
Postman = _Postman;
