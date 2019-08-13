import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.class';
import { Injectable } from '@angular/core';
import { IProfile } from '../consts/IProfile.interface';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // private profiles: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  // private profileId = 0;

  constructor(
    private http: Http
  ) {}

  createNewProfile(profileData: IProfile): Observable<Profile> {
    // this.profiles.next([...this.profiles.getValue(), new Profile(this.profileId++, profileData)]) ;
    return this.http
      .post(API_URL + '/profile', profileData);
  }

  getAllProfiles(): Observable<Profile[]> {
    // return this.profiles.asObservable();
    return this.http
      .get(API_URL + '/profile/all');
  }

  getProfileById(id: number): Profile {
    // return this.profiles.getValue().find(profile => profile.getId() === id);
    return this.http
      .get(API_URL + '/profile/' + id);
  }

  removeProfileById(id: number): Observable<null> {
    // this.profiles.next(this.profiles.getValue().filter(profile => profile.getId() !== id));
    return this.http
      .delete(API_URL + '/profile/' + id);
  }

  updateProfileById(id: number, profileData: IProfile): Observable<Profile> {
    // const profile = this.getProfileById(id);
    // profile.setProfileData(profileData);
    return this.http
      .put(API_URL + '/profile/' + id, profileData);
  }
}
