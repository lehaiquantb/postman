import { Type } from 'class-transformer';
import { X } from '../lib/postman';
import { Serializable } from '../@types/index';

const pm: any = {};

type QueryParam = {
    key: string;
    value: string;
};
const request = {
    addParam: function (key: string, value: string) {
        // pm.request.addQueryParams([{ key, value } as any]);
        // pm.request.url
    },
};

export class Request implements Serializable<Request> {
    serialize(): string {
        return 'pm.request.url';
    }
    deserialize(value?: string): Request {
        return new Request();
    }

    ax = pm?.collectionVariables?.get('a');

    @Type(() => X)
    rrr = new X();
}

export default request;
