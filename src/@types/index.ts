export interface Serializable<T = any> {
    serialize: () => string;
    deserialize: (jsonString?: string) => T;
}