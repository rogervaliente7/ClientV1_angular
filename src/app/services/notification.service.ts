import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showError(title: string, message: string): void {
    alert(`${title}: ${message}`); // Usa tu librería de notificaciones preferida (Toast, etc.)
  }

  showSuccess(title: string, message: string): void {
    alert(`${title}: ${message}`);
  }
}
