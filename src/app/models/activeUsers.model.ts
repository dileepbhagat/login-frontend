export class ActiveUsers {
    serialNo: number;
    loginId: string;
    loginTime: string;
    frequency: number;
    accessedDate: Date;
    mobNo: String;

    constructor() {
        this.serialNo=-1;
        this.loginId='';
        this.loginTime= '';
        this.frequency=-1;
        this.accessedDate=new Date();
        this.mobNo="1234567890";
    }
}