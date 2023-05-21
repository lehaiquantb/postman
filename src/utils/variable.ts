const variable = {
    _helper_: {
        generateCustomVariables,
    },
};

function generateCustomVariables() {
    const variableKeys = [];
    // const string = "{{!aas().asd'}}1212{{!bas}}";
    const regexp = /{{(![^\}\{]+)}}/g;

    let matchText = '';

    const request = pm.request;
    const {
        url: { query },
        headers,
        body,
    } = pm.request;
    query?.each((q: any) => {
        matchText += `${q?.key}\n${q?.value}\n`;
    }, null);
    headers?.each((h: any) => {
        matchText += `${h?.key}\n${h?.value}\n`;
    }, null);
    if ((body.mode = 'raw')) {
        matchText += `${body?.raw}\n`;
    }
    const matches = matchText.matchAll(regexp);

    for (const match of matches) {
        variableKeys.push(match?.[1]);
    }
    console.log('variableKeys', variableKeys);
    // console.log('generateVariables');
}

export default variable;
