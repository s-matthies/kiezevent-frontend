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
  let element = document.querySelector('.navbar');
  if (element) {
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-shrink');
    } else {
      element.classList.remove('navbar-shrink');
    }
  }
}

}
