import * as moment from "moment";

export class Photo {
    name: string;
    tooltip: string;
    pointer: string;
    preview: string;
    constructor(data: any) {
         Object.assign(this, data);
    }
    public convertDate(date: string) {
        return moment(date).format("DD-MMM-YY HH:mm:ss");
    }
}