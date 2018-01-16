import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    profile: any;

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        this.authService.userProfile$.subscribe(profile => this.profile = profile);
    }
}
