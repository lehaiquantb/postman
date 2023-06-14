import { Exclude } from 'class-transformer';
import { Postwoman } from './postwoman';

export type BaseProps = {
    postman?: Postman | undefined;
    postwoman?: Postwoman | undefined;
};

@Exclude()
export class Base {
    constructor(props?: BaseProps) {
        this.init(props);
    }

    @Exclude()
    postman?: Postman | undefined;

    @Exclude()
    postwoman?: Postwoman | undefined;

    public init(props?: BaseProps) {
        this.postman = props?.postman;
        this.postwoman = props?.postwoman;
    }

    log(message?: any, ...args: any[]) {
        Postwoman.log(message, ...args);
    }

    error(message?: any, ...args: any[]) {
        Postwoman.error(message, ...args);
    }

    static log(message?: any, ...args: any[]) {
        console.log(`[POSTWOMAN]: ${message}`, ...args);
    }

    static error(message?: any, ...args: any[]) {
        console.error(`[POSTWOMAN]: ${message}`, ...args);
    }
}
