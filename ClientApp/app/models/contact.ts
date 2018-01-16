export class Contact {
    name: string;
    phone: string;
    email: string;

    constructor(init?: Partial<Contact>) {
        if(init)
            Object.assign(this, init);
        else {
            this.name = "";
            this.email = "";
            this.phone = "";
        }
    }
}