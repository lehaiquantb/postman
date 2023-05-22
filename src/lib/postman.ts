import moment from 'moment';
import utils from '../utils/helper';
import faker from '../utils/faker';
import variable from '../utils/variable';
import tester from '../utils/tester';
import request from '../utils/request';

console.log('HELLO POSTMAN at', moment().format('YYYY-MM-DD'));

class X {
    v = 1;
    constructor() {
        this.v = 2;
    }
}

class Postman {
    constructor() {}
    Faker = faker;
    Utils = utils;
    Moment = moment;
    static Variable = variable;
    Tester = tester;
    Request = request;
    xs: X[] = [];

    addX() {
        this.xs.push(new X());
    }

    showX() {
        console.log(this.xs);
    }
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
