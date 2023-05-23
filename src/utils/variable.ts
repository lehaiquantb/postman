import moment from 'moment';
import faker from './faker';

export class Variable {
    constructor() {}

    static get(key: string): any {
        if (pm?.collectionVariables?.get) {
            return pm?.collectionVariables?.get(key);
        }
        return undefined;
    }

    static set(key: string, value: any, type?: any): void {
        if (pm?.collectionVariables?.set) {
            let _v = value;
            if (typeof value === 'object') {
                _v = JSON.stringify(value);
            }
            pm?.collectionVariables?.set(key, _v, type);
        }
    }

    static context = {
        moment,
        faker,
    };

    values = {};

    evaluate(evaluateString: string, variableKey?: string) {
        try {
            let v = (this.values as any)?.[variableKey];
            const { moment, faker } = Variable.context;
            if (!v) {
                v = eval(evaluateString);
            }
            return v;
        } catch (error) {
            return undefined;
        }
    }

    // evaluateVariable('moment()');

    generateCustom() {
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
            const value = this.evaluate(evaluateString, key);
            pm.collectionVariables.set(key, value);
        });
        // console.log('variableKeys', variableKeys);
        // console.log('generateVariables');
    }
}
