export class Users {
    userid: number;
    loginid: string;
    password: string;
    dateLastLogin: Date;
    dateLastPasswordChange: Date;
    dateFirstfailloginattempt: Date;
    dateSecondfailloginattempt: Date;
    failedLoginAttempts: number;
    role: number;
    oldpassword1: string;
    oldpassword2: string;
    oldpassword3: string;
    passwordChangeStatus: string;
    locked: Boolean;
    creationDate: Date;
    otpattempt: number;
    agencyid: number;
    dscflag: string;
    userCreationId: number;
    userTypeId: string;

    constructor() { 
        this.userid= 1;
        this.loginid= 'Case Details';
        this.password= 'Case Details';
        this.dateLastLogin= new Date();
        this.dateLastPasswordChange= new Date();
        this.dateFirstfailloginattempt= new Date();
        this.dateSecondfailloginattempt= new Date();
        this.failedLoginAttempts= 0;
        this.role= 0;
        this.oldpassword1='';
        this.oldpassword2= '';
        this.oldpassword3= '';
        this.passwordChangeStatus= '';
        this.locked= false;
        this.creationDate= new Date();
        this.otpattempt= 0;
        this.agencyid= 0;
        this.dscflag='';
        this.userCreationId= 0;
        this.userTypeId= '';
    }
}