export default {
    email: function () {
        return pm.variables.replaceIn('{{$randomEmail}}');
    },
};
