import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from './core/services/session.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})

export class AppComponent implements OnInit{
  public overlay = 'not-active';
  private router = inject(Router);
  private sessionService = inject(SessionService);
  public sizeScreen!: number;

  ngOnInit(): void {
    this.sizeScreen = window.innerWidth;
    this.overlay = 'not-active';
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['']);
  }

  @HostListener('window:resize')
  onResize() {
    this.sizeScreen = window.innerWidth;
  }

  closeNavBar(){
    this.overlay = 'not-active';
  }

  openNavBar(){
    this.overlay = 'active';
  }

}
