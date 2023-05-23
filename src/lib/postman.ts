import 'reflect-metadata';
import '../plugins/moment/extendMoment';
import moment from 'moment';
import helper from '../utils/helper';
import faker from '../utils/faker';
import { Variable } from '../utils/variable';
import tester from '../collections/tester';
import request, { Request } from '../collections/request';
import { forEach } from 'lodash';
import {
    instanceToPlain,
    plainToInstance,
    Exclude,
    Type,
} from 'class-transformer';
import { Runner } from '../collections/runner';
import constants from '../utils/constants';

console.log('HELLO POSTMAN at', moment().format('YYYY-MM-DD'));
export class X {
    v = 1;
    constructor() {
        this.v = 2;
    }
}

class Postman {
    constructor() {}

    static version = `${new Date().toISOString()}`;
    // test(jsonString?: string) {
    //     forEach(this, (value: any, key: string) => {
    //         console.log(key, value);
    //         console.log((this as any)[key]);
    //     });
    //     // return JSON.parse(jsonString);
    // }

    // serialize(): string {
    //     const me = this as any;
    //     const obj = JSON.parse(JSON.stringify(me));
    //     forEach(obj, (key, value) => {
    //         me[key];
    //     });
    //     return JSON.stringify(this);
    // }

    // deserialize(jsonString?: string): Postman {
    //     const instance = new Postman();
    //     const obj = helper.parseJson(jsonString);
    //     forEach(this, (value: any, key: string) => {
    //         const me: any = this;
    //         if (me) {
    //         }
    //     });
    //     return JSON.parse(jsonString);
    // }

    @Exclude()
    Faker = faker;

    @Exclude()
    static Helper = helper;

    @Exclude()
    Moment = moment;

    @Exclude()
    static Constants = constants;

    variable = new Variable();

    @Type(() => Runner)
    runnerList: Runner[] = [];

    // @Exclude()
    Tester = tester;

    @Exclude()
    Request = request;

    @Type(() => Request)
    currentRequest = new Request();

    // xs: X[] = [new X()];

    // addX() {
    //     this.xs.push(new X());
    // }

    // showX() {
    //     console.log(this.xs);
    // }

    snapShot(_pm?: Postman): void {
        const postmanObj = instanceToPlain(_pm ?? this);
        // console.log(Postman.version);
        Variable.set(Postman.Constants.CKey.POSTMAN_PLAIN, postmanObj);
    }

    static init() {
        let postman: Postman;
        const postmanPlain = pm?.collectionVariables?.get(
            Postman.Constants.CKey.POSTMAN_PLAIN,
        );
        const postmanObj = Postman.Helper.parseJson(postmanPlain) ?? {};
        // @ts-ignore
        if (__VERSION__ === postmanObj?.version) {
            postman = new Postman();
            Variable.set(
                Postman.Constants.CKey.POSTMAN_PLAIN,
                instanceToPlain(postman),
            );
        } else {
            postman = plainToInstance(Postman, postmanObj);
        }

        return postman;
    }

    static onPreRequest(callback: (postman: Postman) => void): void {
        const postman = Postman.init();
        callback(postman);
        postman.snapShot();
        // console.log(Postman.version);
    }
}

// forEach(postman, (x, key, p) => {
//     // debugger;
//     console.log(x);
// });
// const m = new X();

// console.log(instanceToPlain(postman));
// console.log(
//     plainToInstance(Postman, {
//         Tester: {},
//         currentRequest: {
//             rrr: {
//                 v: 2,
//             },
//         },
//         xs: [
//             {
//                 v: 2,
//             },
//             {
//                 v: 2,
//             },
//         ],
//     })?.currentRequest,
// );

// console.log('XXXxx');
// console
// eval(`pm.globals.set('myGlobalVariable', _Faker)`);
// _.add(5, 5);
// this.Faker = _Faker;
// console.log(myGlobalVariable)
// export { _Faker };

/*
    @_Postman_:
*/
const _postman = new Postman();

// @ts-ignore
_postman_ = _postman;

// @ts-ignore
_Postman_ = Postman;

// @ts-ignore
__VERSION__ = Postman.version;
