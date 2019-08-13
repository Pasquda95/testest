import { Profile } from 'src/app/models/profile.class';
import { availableNationalities } from './../../consts/availableNationalities';
import { IProfile } from '../../consts/IProfile.interface';
import { Component } from '@angular/core';
import { GenderType } from 'src/app/consts/genderType.enum';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent {

  nationalities = availableNationalities;
  genderTypes = GenderType;
  profileId: string;
  profileForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {
      this.setInitialFormValue();
      this.profileId = this.route.snapshot.params.id;
      if (this.checkIfProfileExist()) {
        this.fillFormWithData();
      }
     }

  setInitialFormValue(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: [new Date(''), Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      nationalities: ['', Validators.required],
    });
  }

  getGenders(): Array<string> {
    return Object.keys(this.genderTypes);
  }

  nationalitiesToArray(): object {
    return Object.values(this.nationalities);
  }

  addProfile(): void {
    this.profileService.createNewProfile(this.profileForm.getRawValue());
    this.setInitialFormValue();
    this.openSnackBar('Profile added successfully', 'close');
  }

  editProfile(): void {
    this.getProfileById().setProfileData(this.profileForm.getRawValue());
    this.openSnackBar('Profile updated successfully', 'close');
  }

  getProfileById(): Profile {
    return this.profileService.getProfileById(parseInt(this.profileId, 10));
  }

  checkIfProfileExist(): boolean {
    return this.profileId !== undefined && !!this.getProfileById();
  }

  fillFormWithData(): void {
    const profile: IProfile = this.getProfileById().getProfileData();
    this.profileForm.patchValue(profile);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}
