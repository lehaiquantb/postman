import moment from 'moment';

export class Runner {
    constructor() {}
    id: string = `runner-${moment().timeId()}`;
    setId(_id: string) {
        this.id = `runner-${_id}}`;
    }
    run() {}
}
