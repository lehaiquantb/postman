import moment from 'moment';
import { PWRequest } from './request.pw';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { TransformToClassRequest } from '../decorators/transform.request.decorator';

export class PWOrder {
    constructor() {}

    id: string = `order-${moment().timeId()}`;

    @Expose()
    @TransformToClassRequest()
    @Transform(
        (params: TransformFnParams) => {
            return params?.value?.toJSON?.();
        },
        { toPlainOnly: true },
    )
    request?: PWRequest;

    // response: any = {};
}
