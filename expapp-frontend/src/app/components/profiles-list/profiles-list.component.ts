import { Profile } from 'src/app/models/profile.class';
import { ProfileService } from './../../services/profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { availableNationalities } from 'src/app/consts/availableNationalities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit, OnDestroy {
  availableProfiles: Array<Profile> = [];
  nationalities = availableNationalities;
  unsubscriber$: Subject<boolean> = new Subject<boolean>();

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.profileService.getAllProfiles().pipe(
      takeUntil(this.unsubscriber$)
    ).subscribe(
      profiles => this.availableProfiles = profiles
    );
  }

  moveToEditProfile(id: number, status: boolean): void {
    if(status) {
      this.router.navigateByUrl(`/manage-profile/${id}`);
    }
  }

  removeProfile(id: number): void {
    this.profileService.removeProfileById(id);
  }

  manageProfile(profile: Profile): void {
    profile.toggleAccountStatus();
  }

  getNationalitiesById(nationalityId: string): string {
    const choosenNationality = this.nationalities.find(nationality => nationality.id === parseInt(nationalityId, 10));
    if (choosenNationality) {
      return choosenNationality.name;
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.unsubscribe();
  }

}
