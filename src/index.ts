import moment from 'moment';
import Postman from './postman';
const _ = require('lodash');
const utils = require('utils1');
console.log('HELLO POSTMAN', moment().format('YYYY-MM-DD'));
const M = moment;
const _Faker = {
    email: function () {
        pm.variables.replaceIn('{{$randomEmail}}');
    },
};
// _.add(5, 5);
// this.Faker = _Faker;
// Faker = _Faker;
// console.log(myGlobalVariable)
export { _Faker };
