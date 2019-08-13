import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isMenuOpened = false;

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  redirectTo(path: string): void {
    this.toggleMenu();
    this.router.navigateByUrl(path);
  }

}
