import moment from 'moment';
import utils from '../utils/helper';
import faker from '../utils/faker';
import variable from '../utils/variable';
import tester from '../utils/tester';
import request from '../utils/request';

console.log('HELLO POSTMAN at', moment().format('YYYY-MM-DD'));

class Postman {
    constructor() {}
    static Faker = faker;
    static Utils = utils;
    static Moment = moment;
    static Variable = variable;
    static Tester = tester;
    static Request = request;
}

const _Postman = new Postman();

// console.log('XXXxx');
// console
// eval(`pm.globals.set('myGlobalVariable', _Faker)`);
// _.add(5, 5);
// this.Faker = _Faker;
// console.log(myGlobalVariable)
// export { _Faker };

// @ts-ignore
_Postman_ = _Postman;
