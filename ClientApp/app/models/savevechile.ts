import { Contact } from './contact';

export class SaveVechile {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;

    constructor(init?: Partial<SaveVechile>) {
        if(init)
            Object.assign(this, init);
        else {
            this.id = 0;
            this.modelId = 0;
            this.makeId = 0;
            this.isRegistered = false;
            this.features = [];
            this.contact = new Contact();
        }
    }
}