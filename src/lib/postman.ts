import moment from 'moment';
import utils from '../utils/helper';
import faker from './faker';
import variable from '../utils/variable';

console.log('HELLO POSTMAN', moment().format('YYYY-MM-DD'));

export const _Postman: any = {
    Faker: faker,
    Utils: utils,
    Moment: moment,
    Variable: variable,
};
_Postman.self = _Postman;

console.log('XXXxx');
// console
// eval(`pm.globals.set('myGlobalVariable', _Faker)`);
// _.add(5, 5);
// this.Faker = _Faker;
// console.log(myGlobalVariable)
// export { _Faker };

// @ts-ignore
Postman = _Postman;
