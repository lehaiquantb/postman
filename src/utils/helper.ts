import { instanceToPlain, plainToInstance } from 'class-transformer';
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

function set(key: string, value: any) {
    pm.collectionVariables.set(key, value);
}

function get(key: string): any {
    return pm.collectionVariables.get(key);
}

export default {
    sayHello,
    parseJson,
    plainToInstance,
    instanceToPlain,
    set,
    get,
};
