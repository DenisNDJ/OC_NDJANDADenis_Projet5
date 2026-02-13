import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from './core/services/session.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})

export class AppComponent {
  private router = inject(Router);
  private sessionService = inject(SessionService);
  public sizeScreen!: number;

  public $isLogged(): Observable<boolean> {
    this.sizeScreen = window.innerWidth
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }

  @HostListener('window:resize')
  onResize() {
    this.sizeScreen = window.innerWidth;
  }
}
