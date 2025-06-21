import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    if (typeof window !== 'undefined' && window && 'localStorage' in window) {
      const saved = window.localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        result = saved;
      } else if ('matchMedia' in window && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        result = 'dark';
      }
    }
    return result;
  }

  // PUBLIC_INTERFACE
  toggleTheme() {
    const next: 'dark' | 'light' = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    if (typeof window !== 'undefined' && window && 'localStorage' in window) {
      window.localStorage.setItem('theme', next);
    }
  }

  // PUBLIC_INTERFACE
  applyTheme(theme: 'dark' | 'light') {
    this.currentTheme = theme;
    if (typeof document !== 'undefined' && document && 'documentElement' in document) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}
