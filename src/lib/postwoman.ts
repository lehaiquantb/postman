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
    instanceToInstance,
} from 'class-transformer';
import { Runner } from '../collections/runner';
import constants from '../utils/constants';

const VERSION = __VERSION__ || `${new Date().toISOString()}`;

export class X {
    v = 1;
    constructor() {
        this.v = 2;
    }
}

const Test = {
    set(key: string, value: any) {
        pm.collectionVariables.set(key, value);
    },
};

type PostwomanProps = {
    pm?: Postman;
};

class Postwoman {
    constructor(props?: PostwomanProps) {
        this.init(props);
    }

    init(props?: PostwomanProps) {
        this.postman = props?.pm;
        if (this.variable) {
            this.variable?.init({ postman: props?.pm });
        } else {
            this.variable = new Variable({ postman: props?.pm });
        }
    }

    @Exclude()
    postman: Postman | undefined;

    version = VERSION;
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

    // deserialize(jsonString?: string): Postwoman {
    //     const instance = new Postwoman();
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

    @Type(() => Variable)
    variable: Variable;

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

    public snapShot(_pw?: Postwoman): void {
        const me = _pw ?? this;
        const postwomanObj = instanceToPlain(me);

        me?.variable?.set(
            Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
            postwomanObj,
        );
    }

    static create(_pm?: Postman): Postwoman {
        let postwoman: Postwoman;
        const postwomanPlain = _pm?.collectionVariables?.get(
            Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
        );
        const postwomanObj = Postwoman.Helper.parseJson(postwomanPlain) ?? {};
        // @ts-ignore
        if (__VERSION__ !== postwomanObj?.version) {
            postwoman = new Postwoman({ pm: _pm });
            // postwoman.variable.set(
            //     Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
            //     instanceToPlain(postwoman),
            // );
        } else {
            postwoman = plainToInstance(Postwoman, postwomanObj);
            postwoman.init({ pm: _pm });
        }

        return postwoman;
    }

    public static onPreRequest(
        __pm: any,
        callback: (postwoman: Postwoman) => void,
    ): void {
        const pw = Postwoman.create(__pm);
        callback(pw);
        pw.snapShot(pw);
    }

    addRunner(runner = new Runner()) {
        this.runnerList.push(runner);
    }
}

// forEach(postwoman, (x, key, p) => {
//     // debugger;
//     console.log(x);
// });
// const m = new X();

// console.log(
//     plainToInstance(Postwoman, {
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

// const _postwoman = Postwoman.Helper.plainToInstance(
//     Postwoman,
//     Postwoman.Helper.parseJson(
//         `{"version":"2023-05-23T17:47:10.247Z","variable":{"values":{}},"runnerList":[{"id":"runner-2023-05-24_00:47:37"}],"Tester":{},"currentRequest":{"rrr":{"v":2}}}`,
//     ),
// );

const _postwoman = plainToInstance(
    Postwoman,
    Postwoman.Helper.parseJson(
        `{"version":"2023-05-23T17:47:10.247Z","variable":{"values":{"a":1}},"runnerList":[{"id":"runner-2023-05-24_00:47:37"}],"Tester":{},"currentRequest":{"rrr":{"v":2}}}`,
    ),
);

// const _postwoman = new Postwoman({ pm: {} });
// console.log(instanceToPlain(_postwoman));

console.log('HELLO POSTMAN with version => ', VERSION);

// @ts-ignore
_postwoman_ = _postwoman;

// @ts-ignore
_Postwoman_ = Postwoman;

// @ts-ignore
__VERSION__ = VERSION;
