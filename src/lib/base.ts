import { Exclude } from "class-transformer";
import { Postwoman } from "./postwoman";

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
}