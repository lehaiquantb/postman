import { Exclude } from 'class-transformer';
import { Postwoman } from './postwoman';
import { getGlobalVar } from '../utils/helper';

export type BaseProps = {
    postman?: Postman | undefined;
    postwoman?: Postwoman | undefined;
};

export type IBase = {
    postman?: Postman | undefined;
    postwoman?: Postwoman | undefined;
    log: (message?: any, ...args: any[]) => void;
    error: (message?: any, ...args: any[]) => void;
    init(props?: BaseProps): void;
};

@Exclude()
export class Base implements IBase {
    constructor(props?: BaseProps) {
        this.init(props);
    }

    @Exclude()
    postman?: Postman | undefined;

    @Exclude()
    postwoman?: Postwoman | undefined;

    @Exclude()
    static console?: typeof console = getGlobalVar('console');

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
        this.console?.log(`[POSTWOMAN]: ${message}`, ...args);
    }

    static error(message?: any, ...args: any[]) {
        this.console?.error(`[POSTWOMAN]: ${message}`, ...args);
    }
}
