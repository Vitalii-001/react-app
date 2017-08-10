import * as moment from 'moment';

export class Photo {
    public name: string;
    public tooltip: string;
    public pointer: string;
    public preview: string;
    constructor(data: any) {
         Object.assign(this, data);
    }
    public convertDate(date: string) {
        return moment(date).format('DD-MMM-YY HH:mm:ss');
    }
}