import {
    ClassConstructor,
    ClassTransformOptions,
    instanceToPlain,
    plainToInstance,
} from 'class-transformer';
import { Postwoman } from '../lib/postwoman';
import { Base } from '../lib/base';
function sayHello() {
    console.log('hello');
}

function parseJson(jsonString?: string): Record<string, any> | undefined {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return undefined;
    }
}

function varIsExist(varName: string) {
    try {
        return eval(`typeof ${varName}`) !== 'undefined';
    } catch (error) {
        // console.log('varIsExist', error);
        return false;
    }
}

function set(key: string, value: any) {
    pm.collectionVariables.set(key, value);
}

function get(key: string): any {
    return pm.collectionVariables.get(key);
}

function getGlobalVar<T = any>(varName: string): T | undefined {
    return varIsExist(varName) ? eval(varName) : undefined;
}

function tryEval(str: string): any {
    try {
        return eval(str);
    } catch (error) {
        console.error('tryEval =>', error);
    }
}

function convertToInstance<T extends Base, V>(
    cls: ClassConstructor<T>,
    plain: V,
    options?: ClassTransformOptions & {
        postman?: Postman;
        postwoman?: Postwoman;
    },
): T {
    const __postman = options?.postman ?? getGlobalVar<Postman>('pm');
    const __postwoman = options?.postwoman;

    const instance = plainToInstance(cls, plain, options);
    instance.init({ postman: __postman, postwoman: __postwoman });

    return instance;
}

export default {
    sayHello,
    parseJson,
    tryEval,
    plainToInstance,
    instanceToPlain,
    set,
    get,
    varIsExist,
    getGlobalVar,
    convertToInstance,
};
