import {
    Exclude,
    Expose,
    Transform,
    TransformFnParams,
    instanceToPlain,
    plainToInstance,
} from 'class-transformer';
import moment from 'moment';
import 'reflect-metadata';
import { PWOrder } from '../collections/order.pw';
import { Runner } from '../collections/runner';
import { PWTestModule } from '../collections/tester.test';
import '../plugins/moment/extendMoment';
import constants from '../utils/constants';
import faker from '../utils/faker';
import helper, { getGlobalVar } from '../utils/helper';
import { Variable } from '../utils/variable';
import { Base, BaseProps } from './base';

const VERSION = __VERSION__ || `${new Date().toISOString()}`;

export type PWOnProcessOptions = {
    pm?: Postman;
    console: typeof console;
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
        // console.log('Postwoman constructor');
        super(props);
        this.init(props);
        Postwoman.instance = this;
    }
    private static instance: Postwoman;

    public static getInstance(): Postwoman {
        console.log('Postwoman getInstance');

        if (!Postwoman.instance) {
            Postwoman.instance = new Postwoman();
        }
        return Postwoman.instance;
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
            return Postwoman.Helper.convertToInstanceFromTransformFnParams(
                Variable,
                params,
            );
        },
        { toClassOnly: true },
    )
    variable?: Variable;

    // @Type(() => Runner)
    // runnerList: Runner[] = [];

    @Expose()
    @Transform(
        (params: TransformFnParams) => {
            return Postwoman.Helper.convertToInstanceFromTransformFnParams(
                PWTestModule,
                params,
            );
        },
        { toClassOnly: true },
    )
    tester!: PWTestModule;

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
    order?: PWOrder;

    // xs: X[] = [new X()];

    // addX() {
    //     this.xs.push(new X());
    // }

    // showX() {
    //     console.log(this.xs);
    // }

    public snapShot(_pw?: Postwoman, _pm?: Postman): void {
        try {
            const me = _pw ?? this;
            let postwomanObj = instanceToPlain(me);
            this.log('postwomanObj', postwomanObj);
            if (typeof postwomanObj === 'object') {
                if (postwomanObj?.SNAPSHOT_AT?.length) {
                    delete postwomanObj.SNAPSHOT_AT;
                }
                postwomanObj = {
                    SNAPSHOT_AT: moment().toISOString(),
                    ...postwomanObj,
                };
            }

            me?.variable?.set?.(
                Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
                postwomanObj,
            );
        } catch (error) {
            Postwoman.error('snapShot', error);
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

    static create(options: PWOnProcessOptions): Postwoman {
        try {
            getGlobalVar('console')?.log('Creating');
            const { pm: _pm } = options;
            let postwoman: Postwoman;
            const postwomanPlain = _pm?.collectionVariables?.get(
                Postwoman.Constants.CKey.POSTWOMAN_PLAIN,
            );
            const postwomanObj =
                Postwoman.Helper.parseJson(postwomanPlain) ?? {};

            // console.log('postwomanObj', postwomanObj);
            postwoman = plainToInstance(Postwoman, postwomanObj, {
                extraData: { postman: _pm, postwoman },
            });
            postwoman.init({ postman: _pm });
            options?.console?.log('Initialized');
            if (options?.console) {
                Postwoman.console = options?.console;
            }

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
            Postwoman.error('create', error);
        }
    }

    public static async onProcess(
        options: PWOnProcessOptions,
        callback: PWOnProcessCallback,
    ): Promise<void> {
        try {
            const pw = Postwoman.create(options);
            await callback({ pw });
            pw.snapShot(pw, options?.pm);
        } catch (error) {
            Postwoman.error('onProcess', error);
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

// console.log(_postwoman);

// const _postwoman = new Postwoman({ pm: {} });
// console.log(instanceToPlain(_postwoman));
const _postwoman = plainToInstance(Postwoman, {
    variable: { a: {} },
    pm: {},
    tester: {},
});

Postwoman.log('HELLO POSTMAN with version => ', VERSION);
if (__ENV__ === 'development') {
    const pObj = Postwoman.Helper.parseJson(
        `{"version":"2023-05-23T17:47:10.247Z","variable":{"values":{"a":1}},"runnerList":
        [{"id":"runner-2023-05-24_00:47:37"}],"Tester":{},"currentRequest":{"rrr":{"v":2}},"xxx":{}}`,
    );

    pObj.h = function () {
        console.log('hello');
    };
    // const _postwoman = {};

    // _postwoman.order = {} as any;
    const _plainPostwoman = instanceToPlain(_postwoman);

    // @ts-ignore
    _plainPostwoman_ = _plainPostwoman;
}

// @ts-ignore
_postwoman_ = _postwoman;

// @ts-ignore
_Postwoman_ = Postwoman;

// @ts-ignore
__VERSION__ = VERSION;
