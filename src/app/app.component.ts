import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Join';
  constructor(private router: Router, private route: ActivatedRoute) {}

  shouldShowAside(): boolean {
    const excludedRoutes = ['login', 'register', 'forgot-password'];
    const currentRoute: any = this.route.snapshot.firstChild?.routeConfig?.path;

    return !excludedRoutes.includes(currentRoute);
  }
}
