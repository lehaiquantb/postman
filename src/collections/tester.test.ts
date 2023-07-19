// import { MatcherState } from 'expect';
// import { Plugin } from 'pretty-format';

import { Exclude } from 'class-transformer';
import { Base, BaseProps, IBase } from '../lib/base';
import { Postwoman } from '../lib/postwoman';
import { generateUuid } from '../utils/helper';
// import supertest, { CallbackHandler } from 'supertest';
// let e1 = ((actual: any, ...rest: Array<any>) => {}) as jest.Expect;
// e1.assertions = () => {
//     pm.test("x",() => {
//         pm.expect(true).to.be.true;
//     })
// };
// e1.anything = () => {};

// let e: jest.Expect = {
//     anything: function () {
//         throw new Error('Function not implemented.');
//     },
//     any: function (classType: any) {
//         throw new Error('Function not implemented.');
//     },
//     arrayContaining: function <E = any>(arr: readonly E[]) {
//         throw new Error('Function not implemented.');
//     },
//     assertions: function (num: number): void {
//         throw new Error('Function not implemented.');
//     },
//     closeTo: function (num: number, numDigits?: number) {
//         throw new Error('Function not implemented.');
//     },
//     hasAssertions: function (): void {
//         throw new Error('Function not implemented.');
//     },
//     extend: function (obj: jest.ExpectExtendMap): void {
//         throw new Error('Function not implemented.');
//     },
//     addSnapshotSerializer: function (serializer: Plugin): void {
//         throw new Error('Function not implemented.');
//     },
//     objectContaining: function <E = {}>(obj: E) {
//         throw new Error('Function not implemented.');
//     },
//     stringMatching: function (str: string | RegExp) {
//         throw new Error('Function not implemented.');
//     },
//     stringContaining: function (str: string) {
//         throw new Error('Function not implemented.');
//     },
//     not: undefined,
//     setState: function (state: object): void {
//         throw new Error('Function not implemented.');
//     },
//     getState: function (): MatcherState & Record<string, any> {
//         throw new Error('Function not implemented.');
//     },
// };

// class TesterExpect implements jest.Expect {
//     constructor<T = any>() {}
//     JestMatchers: jest;
//     // <T = any>(actual: T): jest.JestMatchers<T>;
//     anything() {
//         throw new Error('Method not implemented.');
//     }
//     any(classType: any) {
//         throw new Error('Method not implemented.');
//     }
//     arrayContaining<E = any>(arr: readonly E[]) {
//         throw new Error('Method not implemented.');
//     }
//     assertions(num: number): void {
//         throw new Error('Method not implemented.');
//     }
//     closeTo(num: number, numDigits?: number) {
//         throw new Error('Method not implemented.');
//     }
//     hasAssertions(): void {
//         throw new Error('Method not implemented.');
//     }
//     extend(obj: jest.ExpectExtendMap): void {
//         throw new Error('Method not implemented.');
//     }
//     addSnapshotSerializer(serializer: Plugin): void {
//         throw new Error('Method not implemented.');
//     }
//     objectContaining<E = {}>(obj: E) {
//         throw new Error('Method not implemented.');
//     }
//     stringMatching(str: string | RegExp) {
//         throw new Error('Method not implemented.');
//     }
//     stringContaining(str: string) {
//         throw new Error('Method not implemented.');
//     }
//     not: jest.InverseAsymmetricMatchers;
//     setState(state: object): void {
//         throw new Error('Method not implemented.');
//     }
//     getState(): MatcherState & Record<string, any> {
//         throw new Error('Method not implemented.');
//     }
// }
// @Exclude()

export class TestCase {
    name: string;
    func: () => Promise<any>;
}

export class TestFlow {
    id: string = generateUuid();
}

/**
 * This file will be run in test environment, make sure to import only test dependencies
 */
export class TestModule {
    testCaseList: TestCase[] = [];

    testFlowList: TestFlow[] = [];

    log = (message?: any, ...args: any[]) => {
        console.log(`[PWTester]: ${message}`, ...args);
    };

    error = (message?: any, ...args: any[]) => {
        console.log(`[PWTester]: ${message}`, ...args);
    };

    // describe(name: string, cb: () => void) {
    //     describe(name, () => {
    //         console.log('describexxx', name);

    //         cb();
    //     });
    // }

    // async describe(name: string, cb: () => Promise<any>) {
    //     this.testCaseList.push({
    //         name,
    //         func: cb,

    //     });
    //     console.log(await cb?.());
    // }

    async addCase(name: string, cb: () => Promise<any>) {
        this.testCaseList.push({
            name,
            func: cb,
        });
        console.log(await cb?.());
    }

    start() {}

    // run() {}

    // expect: TesterExpect = expect;
}

export class PWTestModule extends TestModule implements IBase {
    constructor(props?: BaseProps) {
        super();
        this.postman = props?.postman;
        this.postwoman = props?.postwoman;
    }

    init(props?: BaseProps): void {
        this.postman = props?.postman;
        this.postwoman = props?.postwoman;
    }

    @Exclude()
    postman?: Postman | undefined;

    @Exclude()
    postwoman?: Postwoman | undefined;
}

type SupertestModuleProps = {
    app?: any;
};

export class SupertestModule {
    app: any;

    constructor(props: SupertestModuleProps) {
        this.app = props.app;
    }

    // get client() {
    //     return supertest(this.app);
    // }

    // async get(
    //     url: string,
    //     callback?: CallbackHandler,
    // ): Promise<SupertestModule> {
    //     return new Promise((resolve, reject) => {
    //         this.client.get(url, callback);
    //         resolve(this);
    //     });

    //     // const res = await this.request
    //     //     .get(url, callback)
    //     //     .auth('username', 'password');
    //     // res.body;
    // }

    // async post(...params: any) {
    //     await this.client.get('/');
    //     console.log('post', params);
    // }
}

const tester = new PWTestModule();
const supertestModule = new SupertestModule({});

class TestRequest implements Promise<number> {
    constructor() {}
    then<TResult1 = number, TResult2 = never>(
        onfulfilled?: (value: number) => TResult1 | PromiseLike<TResult1>,
        onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>,
    ): Promise<TResult1 | TResult2> {
        console.log('then');

        throw new Error('Method not implemented.');
    }
    catch<TResult = never>(
        onrejected?: (reason: any) => TResult | PromiseLike<TResult>,
    ): Promise<number | TResult> {
        console.log('catch');
        throw new Error('Method not implemented.');
    }
    finally(onfinally?: () => void): Promise<number> {
        console.log('finally');
        throw new Error('Method not implemented.');
    }
    [Symbol.toStringTag]: string;
}

const a = new TestRequest();

export default tester;
