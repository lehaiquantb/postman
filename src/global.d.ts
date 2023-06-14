import * as cl from 'class-transformer';

declare module 'class-transformer/types/interfaces/class-transformer-options.interface' {
    export interface ClassTransformOptions {
        extraData: ClassTransformOptionsExtraData;
    }
}
