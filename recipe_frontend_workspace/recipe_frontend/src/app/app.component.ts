import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';

  currentTheme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    // Set the initial theme preference
    this.applyTheme(this.getPreferredTheme());
  }

  // Helper to get theme
  private getPreferredTheme(): 'light' | 'dark' {
    let result: 'light' | 'dark' = 'light';
    if (typeof window !== 'undefined') {
      const w = window as any;
      if (w.localStorage) {
        const saved = w.localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
          result = saved;
        } else if (w.matchMedia && w.matchMedia('(prefers-color-scheme: dark)').matches) {
          result = 'dark';
        }
      }
    }
    return result;
  }

  // PUBLIC_INTERFACE
  toggleTheme() {
    const next: 'dark' | 'light' = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    if (typeof window !== 'undefined') {
      const w = window as any;
      if (w.localStorage) w.localStorage.setItem('theme', next);
    }
  }

  // PUBLIC_INTERFACE
  applyTheme(theme: 'dark' | 'light') {
    this.currentTheme = theme;
    if (typeof document !== 'undefined') {
      const d = document as any;
      if (d.documentElement) d.documentElement.setAttribute('data-theme', theme);
    }
  }
}
