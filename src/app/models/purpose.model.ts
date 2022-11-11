export class Purpose {
    serialNo: number;
    purposeName: string;
    purposeShortCode: string;
    isValid: boolean;
    dateOfCreation: Date;
    dateOfUpdation: Date;

    constructor() {
        this.serialNo=-1;
        this.purposeName='';
        this.purposeShortCode=''; 
        this.isValid=true;
        this.dateOfCreation=new Date();
        this.dateOfUpdation=new Date();
    }
}