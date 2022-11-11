export class Session {
    sessionid: number;
    username: string;
    active: boolean;

    constructor() { 
        this.sessionid= 0;
        this.username= '';
        this.active=false;
    }
}