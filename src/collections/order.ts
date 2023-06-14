import moment from 'moment';
import { PWRequest } from './request';

export class Order {
    constructor() {}

    id: string = `order-${moment().timeId()}`;

    request: PWRequest;

    response: any = {};
}
