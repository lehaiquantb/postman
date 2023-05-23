import { X } from '../lib/postman';

type InstanceType = {
    key: string;
    type: 'class' | 'function';
    constructor: any;
};

export class Serializer {
    types: InstanceType[] = [];

    constructor(instanceTypes: InstanceType[] | any[]) {
        const is = instanceTypes?.map((instanceType) => {
            if (instanceType?.key && typeof instanceType?.key === 'string') {
                return {
                    key: instanceType.key,
                    type: 'class',
                    constructor: instanceType?.constructor,
                };
            }

            if (instanceType?.name && typeof instanceType?.name === 'string') {
                return {
                    key: instanceType.name,
                    type: 'class',
                    constructor: instanceType,
                };
            }
        });
        this.types = is as any;
    }

    serialize(object: ArrayLike<unknown> | { [s: string]: unknown }) {
        const idx = this.types.findIndex((type) => {
            return type.key == object.constructor.name;
        });
        if (idx == -1)
            throw "type  '" + object.constructor.name + "' not initialized";
        return JSON.stringify([idx, Object.entries(object)]);
    }

    // deserialize(jstring: string) {
    //     let array = JSON.parse(jstring);
    //     let object = new this.types[array[0]]();
    //     array[1].map((e: any[]) => {
    //         object[e[0]] = e[1];
    //     });
    //     return object;
    // }
}

const serializer = new Serializer([X]);
