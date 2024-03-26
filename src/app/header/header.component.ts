import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let navbar = document.querySelector('.navbar'); 
    let navbarBrand = document.querySelector('.navbar-brand');
    if (navbar && navbarBrand) {
      if (window.scrollY > navbar.clientHeight) {
        navbar.classList.add('navbar-shrink');
        navbarBrand.classList.add('navbar-brand-shrink'); // Fügen Sie die .navbar-brand-shrink Klasse hinzu
      } else {
        navbar.classList.remove('navbar-shrink');
        navbarBrand.classList.remove('navbar-brand-shrink'); // Entfernen Sie die .navbar-brand-shrink Klasse
      }
    }
  }
}

