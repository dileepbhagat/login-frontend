export class Substance {
    substanceName: string;
    substanceType: string;
    substanceNPName: string;
    substanceOtherName: string;
    substanceChemicalName: string;
    enable: boolean;
    dateOfCreation: Date;
    dateOfUpdation: Date;
    serialNo: number;

    constructor() {
        this.substanceName='';
        this.substanceType='';
        this.substanceNPName=''; 
        this.substanceOtherName='';
        this.substanceChemicalName='';
        this.enable=true;
        this.dateOfCreation=new Date();
        this.dateOfUpdation=new Date();
        this.serialNo=-1;
    }
}