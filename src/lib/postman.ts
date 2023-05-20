import moment from 'moment';
import utils from '../utils/helper';
console.log('HELLO POSTMAN', moment().format('YYYY-MM-DD'));

const _Postman = {
    email: function () {
        console.log(1);
        console.log('PM', pm);
        pm.variables.replaceIn('{{$randomEmail}}');
        console.log(2);
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
