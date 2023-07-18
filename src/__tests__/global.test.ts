import tester from '../collections/tester.test';
import request from 'supertest';

const addCase = (name: string, cb: any) => {
    cb?.();
};
// const describe = tester.describe;
describe('Tester', () => {
    it('should be defined', () => {
        expect({}).toBeDefined();
    });
    describe('Tester nested', () => {
        it('should be nested', () => {
            expect({}).toBeDefined();
        });
    });

    describe('a', () => {
        it('testaCase_ should be ', () => {
            expect({}).toBeDefined();
        });
        // return 'a';
    });
});
