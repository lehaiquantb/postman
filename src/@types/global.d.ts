declare var __VERSION__: string;

type PMRequest = import('postman-collection').Request;
type TransformationType =
    import('class-transformer/types/enums/transformation-type.enum').TransformationType;
type ClassTransformOptions =
    import('class-transformer/types/interfaces/class-transformer-options.interface').ClassTransformOptions;
type Postwoman = import('../lib/postwoman').Postwoman;

type ClassTransformOptionsExtraData = {
    postman?: Postman;
    postwoman?: Postwoman;
};
