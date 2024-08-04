import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-pwa',
  standalone: true,
  imports: [],
  templateUrl: './pwa.component.html',
  styleUrl: './pwa.component.css',
})
export class PwaComponent {
  deferredPrompt: any;
  showA2HSNotification: boolean = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showA2HSNotification = true; // Show the notification
  }

  addToHomeScreen() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
    }
    this.showA2HSNotification = false; // Hide the notification
  }

  dismissNotification() {
    this.showA2HSNotification = false; // Hide the notification
  }
}
