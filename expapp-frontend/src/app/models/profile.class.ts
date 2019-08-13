import { GenderType } from 'src/app/consts/genderType.enum';
import { IProfile } from 'src/app/consts/IProfile.interface';

export class Profile implements IProfile {

    private id: number;
    private creationDate: Date;
    private lastUpdate: Date;
    private rating: number;
    private isActive: boolean;
    name: string;
    surname: string;
    birthDate: Date;
    gender: GenderType;
    nationalities: number[];
    phone: string;
    email: string;

    constructor(id, profileData: IProfile) {
        this.id = id;
        this.creationDate = new Date(Date.now());
        this.isActive = true;
        this.rating = 0;
        this.setProfileData(profileData);
    }

    setProfileData(profileData: IProfile): void {
        this.name = profileData.name;
        this.surname = profileData.surname;
        this.birthDate = profileData.birthDate;
        this.gender = profileData.gender;
        this.nationalities = profileData.nationalities;
        this.phone = profileData.phone;
        this.email = profileData.email;
        this.lastUpdate = new Date(Date.now());
    }
    setRating(rating: number): void {
        this.rating = rating;
    }
    getProfileData(): IProfile {
        return {
            name: this.name,
            surname: this.surname,
            birthDate: this.birthDate,
            gender: this.gender,
            nationalities: this.nationalities,
            phone: this.phone,
            email: this.email,
        };
    }

    getId(): number {
        return this.id;
    }

    getRaiting(): number {
        return this.rating;
    }

    toggleAccountStatus(): void {
        this.isActive = !this.isActive;
    }

    getProfileStatus(): boolean {
        return this.isActive;
    }

    getUpdateDate(): Date {
        return this.lastUpdate;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }
}