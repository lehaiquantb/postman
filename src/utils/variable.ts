import moment from 'moment';
import faker from './faker';

const variable = {
    _helper_: {
        generateCustomVariables,
        evaluateVariable,
    },
    _context_: {
        moment,
        faker,
    },
};

function evaluateVariable(evaluateString: string, variableKey?: string) {
    try {
        let v = (variable as any)?.[variableKey];
        const { moment, faker } = variable?._context_;
        if (!v) {
            v = eval(evaluateString);
        }
        return v;
    } catch (error) {
        return undefined;
    }
}

// evaluateVariable('moment()');

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
    variableKeys.forEach((key) => {
        const evaluateString = key.replace('!', '');
        const value = evaluateVariable(evaluateString, key);
        pm.collectionVariables.set(key, value);
    });
    // console.log('variableKeys', variableKeys);
    // console.log('generateVariables');
}

export default variable;
