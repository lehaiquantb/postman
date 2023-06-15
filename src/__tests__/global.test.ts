import tester from "../collections/tester.test";

const addCase = (name: string, cb: any) => {
    cb?.()
};
describe('Tester', () => {
    it('should be defined', () => {
        expect({}).toBeDefined();
    });
    describe('Tester nested', () => {
        it('should be nested', () => {
            expect({}).toBeDefined();
        });
    });

    tester.addCase('a', () => {
        describe('testCase_', () => {
            it('testCase_ should be ', () => {
                expect({}).toBeDefined();
            });
        });
    });
});
