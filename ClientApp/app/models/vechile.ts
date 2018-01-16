import { Contact } from './contact';

export class Vechile {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: string;

    constructor(init?: Partial<Vechile>) {
        if(init) Object.assign(this, init);
    }
}

export interface KeyValuePair {
    id: number;
    name: string;
}

