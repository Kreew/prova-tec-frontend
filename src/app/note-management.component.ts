import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Gestione Note</h1>
    <div class="button-group">
      <button (click)="setContent('Note 1')">Mostra Note 1</button>
      <button (click)="setContent('Note 2')">Mostra Note 2</button>
      <button (click)="setContent('Note 3')">Mostra Note 3</button>
    </div>
    <div class="content-box">
      <p *ngIf="content">{{ content }}</p>
      <p *ngIf="!content">Seleziona un pulsante per visualizzare il contenuto.</p>
    </div>
  `,
  styles: [
    `h1 { color: #333; text-align: center; }`,
    `.button-group { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }`,
    `.button-group button { padding: 10px 20px; font-size: 1em; background-color: #007bff; color: white; border: none; cursor: pointer; border-radius: 5px; }`,
    `.button-group button:hover { background-color: #0056b3; }`,
    `.content-box { border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9; text-align: center; font-size: 1.2em; }`
  ],
})
export class NoteManagementComponent {
  content: string | null = null;

  setContent(newContent: string): void {
    this.content = newContent;
  }
}