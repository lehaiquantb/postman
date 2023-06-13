import {
    Exclude,
    Expose,
    Transform,
    TransformFnParams,
    instanceToPlain,
    plainToInstance,
} from 'class-transformer';
import moment from 'moment';
import { Request } from 'postman-collection';
import 'reflect-metadata';
import { Runner } from '../collections/runner';
import tester from '../collections/tester.test';
import '../plugins/moment/extendMoment';
import constants from '../utils/constants';
import faker from '../utils/faker';
import helper from '../utils/helper';
import { Variable } from '../utils/variable';
import { Base, BaseProps } from './base';

const VERSION = __VERSION__ || `${new Date().toISOString()}`;

export type PWOnProcessOptions = {
    pm?: Postman;
};

export type PWOnProcessCallbackOptions = {
    pw?: Postwoman;
};
export type PWOnProcessCallback = (
    opts: PWOnProcessCallbackOptions,
) => Promise<void>;

export type PWOnPreRequestOptions = {} & PWOnProcessOptions;

export type PWOnTestOptions = {} & PWOnProcessOptions;
export type PWOnCollectionTestOptions = {} & PWOnProcessOptions;

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

type PostwomanProps = {} & BaseProps;

export class Postwoman extends Base {
    constructor(props?: PostwomanProps) {
        super(props);
        this.init(props);
    }

    afterInit() {
        [this.variable].forEach((item) => {
            if (item) {
                item.postwoman = this;
            }
        });
    }

    version = VERSION;

    @Exclude()
    Faker = faker;

    @Exclude()
    static Helper = helper;

    @Exclude()
    Moment = moment;

    @Exclude()
    static Constants = constants;

    @Expose()
    @Transform(
        (params: TransformFnParams) => {
            console.log('transform', params);

            return Postwoman.Helper.convertToInstance(
                Variable,
                params?.value,
                (params?.options as any)?.extraData,
            );
        },
        { toClassOnly: true },
    )
    variable?: Variable;

    // @Type(() => Runner)
    // runnerList: Runner[] = [];

    // @Exclude()
    Tester = tester;

    // @Type(() => PWRequest)
    // @Exclude()
    // @Transform((value: any) => {
    //     // const postman = this.postman;
    //     // eval(`(function() {
    //     //     const sdk = require('postman-collection');
    //     //     const newRequest = new sdk.Request(postman.request.toJSON());
    //     //     return newRequest;
    //     //     })()
    //     // `);
    //     // return new X();
    //     console.log('transform', value);
    // })
    @Expose()
    @Transform(
        (params: TransformFnParams) => {
            const postman = (params?.options as any)?.extraData
                ?.postman as Postman;
            console.log('transform var', params);

            return eval(`(function() {
                const sdk = require('postman-collection');
                if(!postman?.request){
                    return undefined;        
                }
                const newRequest = new sdk.Request(postman?.request?.toJSON());
                return newRequest;
                })()
            `);
        },
        { toClassOnly: true },
    )
    @Exclude({ toPlainOnly: true })
    // @Transform(
    //     (params: TransformFnParams) => {
    //         const postman = (params?.options as any)?.extraData?.pm as Postman;
    //         return eval(`(function() {
    //             const sdk = require('postman-collection');
    //             const newRequest = new sdk.Request(postman.request.toJSON());
    //             return newRequest;
    //             })()
    //         `);
    //     },
    //     { toPlainOnly: true },
    // )
    currentRequest?: Request;

    // xs: X[] = [new X()];

    // addX() {
    //     this.xs.push(new X());
    // }

    // showX() {
    //     console.log(this.xs);
    // }

    public snapShot(_pw?: Postwoman): void {
        try {
            const me = _pw ?? this;
            const postwomanObj = instanceToPlain(me);

            me?.variable?.set?.(
                Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
                postwomanObj,
            );
        } catch (error) {
            console.error('snapShot', error);
        }
    }

    public snapShotCurrentRequest(): void {
        // this.postman.request.
        // const me = this;
        // const postwomanObj = instanceToPlain(me.currentRequest);
        // me?.variable?.set(
        //     Postwoman.Constants.CKey.CURRENT_REQUEST_PLAIN,
        //     postwomanObj,
        // );
    }

    static create(_pm?: Postman): Postwoman {
        try {
            let postwoman: Postwoman;
            const postwomanPlain = _pm?.collectionVariables?.get(
                Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
            );
            const postwomanObj =
                Postwoman.Helper.parseJson(postwomanPlain) ?? {};

            console.log('postwomanObj', postwomanObj);
            postwoman = plainToInstance(Postwoman, postwomanObj, {
                extraData: { postman: _pm, postwoman },
            } as any);
            postwoman.init({ postman: _pm });
            postwoman.afterInit();

            // @ts-ignore
            // if (__VERSION__ !== postwomanObj?.version) {
            //     // postwoman = new Postwoman({ pm: _pm });
            //     postwoman = plainToInstance(Postwoman, postwomanObj);
            //     postwoman.init({ pm: _pm });
            //     // postwoman.variable.set(
            //     //     Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
            //     //     instanceToPlain(postwoman),
            //     // );
            // } else {
            //     postwoman = plainToInstance(Postwoman, postwomanObj);
            //     postwoman.init({ pm: _pm });
            // }

            return postwoman;
        } catch (error) {
            console.error('create', error);
        }
    }

    public static async onProcess(
        options: PWOnProcessOptions,
        callback: PWOnProcessCallback,
    ): Promise<void> {
        try {
            const pw = Postwoman.create(options?.pm);
            await callback({ pw });
            pw.snapShot(pw);
        } catch (error) {
            console.error('onProcess', error);
        }
    }

    public static async onPreRequest(
        opts: PWOnPreRequestOptions,
        callback: (postwoman: Postwoman) => Promise<void>,
    ): Promise<void> {
        Postwoman.onProcess(opts, async (opts: PWOnProcessCallbackOptions) => {
            return await callback(opts.pw);
        });
    }

    public static async onCollectionTest(
        _opts: PWOnCollectionTestOptions,
        callback: (postwoman: Postwoman) => Promise<void>,
    ): Promise<void> {
        Postwoman.onProcess(_opts, async (opts: PWOnProcessCallbackOptions) => {
            return await callback(opts.pw);
        });
    }

    addRunner(runner = new Runner()) {
        // this.runnerList.push(runner);
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
const pObj = Postwoman.Helper.parseJson(
    `{"version":"2023-05-23T17:47:10.247Z","variable":{"values":{"a":1}},"runnerList":
    [{"id":"runner-2023-05-24_00:47:37"}],"Tester":{},"currentRequest":{"rrr":{"v":2}},"xxx":{}}`,
);

pObj.h = function () {
    console.log('hello');
};
// const _postwoman = {};
const _postwoman = plainToInstance(Postwoman, { variable: { a: {} }, pm: {} });
// console.log(_postwoman);

// const _postwoman = new Postwoman({ pm: {} });
// console.log(instanceToPlain(_postwoman));

console.log('HELLO POSTMAN with version => ', VERSION);

// @ts-ignore
_postwoman_ = _postwoman;

// @ts-ignore
_Postwoman_ = Postwoman;

// @ts-ignore
__VERSION__ = VERSION;
