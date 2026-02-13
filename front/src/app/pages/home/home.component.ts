import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone:false
})
export class HomeComponent implements OnInit {
  
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {}

  loginNav(): void{
    this.router.navigate(['/login']);
  }

  registerNav(): void {
    this.router.navigate(['/register']);
  }

}
