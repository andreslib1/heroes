import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/services/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

user?: string | null

  sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Añadir', icon: 'add', url: './new-hero'},
    {label: 'Buscar', icon: 'search', url: './search'},
    
  ];

  constructor(
    private authService: AuthService,
    private router: Router){}

  ngOnInit(){
    this.user = this.authService.getUserName()
  }


  onLogout(){
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }


}
