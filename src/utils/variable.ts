import moment from 'moment';
import faker from './faker';
import { Exclude } from 'class-transformer';

type VariableProps = {
    postman?: Postman;
};

export class Variable {
    constructor(props?: VariableProps) {
        this.init(props);
    }

    init(props?: VariableProps) {
        this.postman = props?.postman;
    }

    @Exclude()
    postman: Postman | undefined;

    public get(key: string): any {
        console.log('get', key);
        if (this.postman?.collectionVariables?.get) {
            return this.postman?.collectionVariables?.get(key);
        }
        return undefined;
    }

    public set(key: string, value: any, type?: any): void {
        console.log('set', key, value, this.postman?.collectionVariables?.set);
        if (this.postman?.collectionVariables?.set) {
            if (typeof value === 'string') {
                this.postman?.collectionVariables?.set(key, value);
            } else {
                this.postman?.collectionVariables?.set(
                    key,
                    JSON.stringify(value),
                );
            }
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
