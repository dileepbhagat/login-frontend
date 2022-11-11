export class DrugType {
    serialNo: number;
    drugTypeName: string;
    drugTypeShortCode: string;
    isValid: boolean;
    dateOfCreation: Date;
    dateOfUpdation: Date;

    constructor() {
        this.serialNo=-1;
        this.drugTypeName='';
        this.drugTypeShortCode=''; 
        this.isValid=true;
        this.dateOfCreation=new Date();
        this.dateOfUpdation=new Date();
    }
}