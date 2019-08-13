import { GenderType } from './genderType.enum';

export interface IProfile {
    name: string;
    surname: string;
    birthDate: Date;
    gender: GenderType;
    nationalities: number[];
    phone: string;
    email: string;
}