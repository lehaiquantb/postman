import moment from 'moment';

console.log('HELLO POSTMAN', moment().format('YYYY-MM-DD'));
const M = moment
const _Faker = {
    email: function () {
        pm.variables.replaceIn('{{$randomEmail}}');
    },
};

// @ts-ignore
Faker = _Faker;