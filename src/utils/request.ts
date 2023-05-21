type QueryParam = {
    key: string;
    value: string;
};
const request = {
    addParam: function (key: string, value: string) {
        pm.request.addQueryParams([{ key, value } as any]);
        // pm.request.url
    },
};
export default request;
