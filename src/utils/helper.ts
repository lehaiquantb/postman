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

export default {
    sayHello,
    parseJson,
    plainToInstance,
    instanceToPlain,
};
