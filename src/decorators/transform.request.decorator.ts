import { Transform, TransformFnParams } from 'class-transformer';
import { Postwoman } from '../lib/postwoman';

export function TransformToClassRequest(): PropertyDecorator {
    return Transform(
        (params: TransformFnParams) => {
            const postman = params?.options?.extraData?.postman;
            console.log('postman', postman);
            
            return Postwoman.Helper.tryEval(
                `(function() {
                if(!postman?.request || !require){
                        return undefined;        
                }
                const sdk = require('postman-collection');

                const newRequest = new sdk.Request(postman?.request?.toJSON());
                return newRequest;
                })()
            `,
                { postman },
            );
        },
        { toClassOnly: true },
    );
}
