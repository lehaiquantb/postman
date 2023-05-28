import { Type } from 'class-transformer';
import { X } from '../lib/postwoman';
import { Serializable } from '../@types/index';
import {
    Url,
    HeaderList,
    Request,
    RequestBody,
    RequestAuth,
    ProxyConfig,
    Certificate,
    VariableList,
    Header,
    QueryParam,
} from 'postman-collection';

// const R = require('postman-collection').Request 
// @ts-ignore

const request = {
    addParam: function (key: string, value: string) {
        // pm.request.addQueryParams([{ key, value } as any]);
        // pm.request.url
    },
};

export class PWRequest  {
    // url: Url;
    // headers: HeaderList;
    // method: string;
    // update(options: Request.definition): void {
    //     throw new Error('Method not implemented.');
    // }
    // body: RequestBody;
    // auth: RequestAuth;
    // proxy: ProxyConfig;
    // certificate: Certificate;
    // authorizeUsing(
    //     type: string | RequestAuth.definition,
    //     options?: VariableList,
    // ): void {
    //     throw new Error('Method not implemented.');
    // }
    // getHeaders(options?: {
    //     ignoreCase: boolean;
    //     enabled: boolean;
    //     multiValue: boolean;
    //     sanitizeKeys: boolean;
    // }) {
    //     throw new Error('Method not implemented.');
    // }
    // forEachHeader(callback: (...params: any[]) => any): void {
    //     throw new Error('Method not implemented.');
    // }
    // addHeader(header: any): void {
    //     throw new Error('Method not implemented.');
    // }
    // removeHeader(
    //     toRemove: string | Header,
    //     options: { ignoreCase: boolean },
    // ): void {
    //     throw new Error('Method not implemented.');
    // }
    // upsertHeader(header: any): void {
    //     throw new Error('Method not implemented.');
    // }
    // addQueryParams(params: string | QueryParam[]): void {
    //     throw new Error('Method not implemented.');
    // }
    // removeQueryParams(params: string | any[]): void {
    //     throw new Error('Method not implemented.');
    // }
    // size() {
    //     throw new Error('Method not implemented.');
    // }
    // toJSON() {
    //     throw new Error('Method not implemented.');
    // }
    // clone(): Request {
    //     throw new Error('Method not implemented.');
    // }
    // id: string;
    // name: string;
    // disabled: boolean;
    // describe(content: string, type?: string): void {
    //     throw new Error('Method not implemented.');
    // }
    // findSubstitutions(): string[] {
    //     throw new Error('Method not implemented.');
    // }
    // forEachParent(
    //     options: { withRoot?: boolean },
    //     iterator: (...params: any[]) => any,
    // ): void {
    //     throw new Error('Method not implemented.');
    // }
    // findInParents(property: string, customizer?: (...params: any[]) => any) {
    //     throw new Error('Method not implemented.');
    // }
    // meta() {
    //     throw new Error('Method not implemented.');
    // }
    // parent() {
    //     throw new Error('Method not implemented.');
    // }
    // ax = pm?.collectionVariables?.get('a');

    // @Type(() => X)
    // rrr = new X();

    // body: PRequest.definition['body'];
}

export default request;
