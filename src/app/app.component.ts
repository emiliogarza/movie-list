import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-recs-1';
  private subs = new Subscription();
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.subs.add(
      this.http.get<any>("https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token").subscribe(
        response => localStorage.setItem("token", response.token),
        error => console.log(error)
      )
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
