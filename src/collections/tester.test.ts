// import { MatcherState } from 'expect';
// import { Plugin } from 'pretty-format';

import { Base, BaseProps, IBase } from '../lib/base';
import { Postwoman } from '../lib/postwoman';

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

/**
 * This file will be run in test environment, make sure to import only test dependencies
 */
export class PWTester implements IBase {
    constructor(props?: BaseProps) {
        this.postman = props?.postman;
        this.postwoman = props?.postwoman;
    }

    init(props?: BaseProps): void {
        this.postman = props?.postman;
        this.postwoman = props?.postwoman;
    }

    postman?: Postman | undefined;

    postwoman?: Postwoman | undefined;

    testCaseList: TestCase[] = [];

    log = (message?: any, ...args: any[]) => {
        console.log(`[PWTester]: ${message}`, ...args);
    };

    error = (message?: any, ...args: any[]) => {
        console.log(`[PWTester]: ${message}`, ...args);
    };

    // describe() {
    //     describe('Tester', () => {
    //         it('should be defined', () => {
    //             expect({}).toBeDefined();
    //             expect.assertions(1);
    //         });
    //     });
    // }

    addCase(name: string, cb: any) {
        this.testCaseList.push({
            name,
            func: cb,
        });
        console.log(cb?.());
    }

    start() {}

    // run() {}

    // expect: TesterExpect = expect;
}

const tester = new PWTester();
export default tester;
