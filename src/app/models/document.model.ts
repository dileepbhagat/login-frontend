export class Document {
    serialNo: number;
    documentName: string;
    documentShortCode: string;
    isValid: boolean;
    dateOfCreation: Date;
    dateOfUpdation: Date;

    constructor() {
        this.serialNo=-1;
        this.documentName='';
        this.documentShortCode=''; 
        this.isValid=true;
        this.dateOfCreation=new Date();
        this.dateOfUpdation=new Date();
    }
}