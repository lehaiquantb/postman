import tester from '../collections/tester.test';
import request from 'supertest';

const addCase = (name: string, cb: any) => {
    cb?.();
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

    tester.addCase('a', async () => {
        describe('testCase_', () => {
            it('testCase_ should be ', () => {
                expect({}).toBeDefined();
            });
        });
        return 'a';
    });
});
