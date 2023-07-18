import {
    ClassConstructor,
    ClassTransformOptions,
    TransformFnParams,
    instanceToPlain,
    plainToInstance,
} from 'class-transformer';
import { Postwoman } from '../lib/postwoman';
import { Base } from '../lib/base';
import Uuid from 'uuid';

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

function tryEval(str: string, context?: Record<string, any>): any {
    try {
        const contextString = `
            const { ${Object.keys(context ?? {}).join(',')} } = context ?? {};
        `;
        return eval(contextString + str);
    } catch (error) {
        console.error('tryEval =>', error);
        return undefined;
    }
}

function convertToInstance<T extends Base, V>(
    cls: ClassConstructor<T>,
    plain?: V,
    options?: ClassTransformOptions,
): T | undefined {
    const __postman =
        options?.extraData?.postman ?? getGlobalVar<Postman>('pm');
    const __postwoman = options?.extraData?.postwoman;
    // console.log('__postman', __postman);
    // console.log('__postwoman', __postwoman);
    // console.log('cls', cls);
    // console.log('plain', plain);
    // console.log('options', options);

    const instance = plainToInstance(cls, plain, options);
    instance?.init({ postman: __postman, postwoman: __postwoman });

    return instance;
}

function convertToInstanceFromTransformFnParams<T extends Base, V>(
    cls: ClassConstructor<T>,
    params?: TransformFnParams,
    postwoman?: Postwoman,
): T {
    const __postman =
        params?.options?.extraData?.postman ?? getGlobalVar<Postman>('pm');
    const __postwoman =
        postwoman ??
        params?.options?.extraData?.postwoman ??
        Postwoman.getInstance();

    const instance = convertToInstance(cls, params?.value ?? {}, {
        ...params?.options,
        extraData: {
            postman: __postman,
            postwoman: __postwoman,
        },
    });

    // Postwoman.log('convertToInstanceFromTransformFnParams', params, instance);

    return instance;
}

export function generateUuid() {
    return Uuid.v4();
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
    convertToInstanceFromTransformFnParams,
};
