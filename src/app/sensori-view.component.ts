import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `    
    <div *ngIf="isLoading" class="loading">Caricamento in corso...</div>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <div *ngIf="!isLoading && !errorMessage">
        <ul>
        <li *ngFor="let item of lists">
            <strong>ID:</strong> {{ item.id }}<br>
            <strong>Modello:</strong> {{ item.modello }}<br>
            <strong>Temperatura:</strong> {{ item.temperatura }}°C
            <button class="info-button" (click)="toggleDetails(item.id)">i</button>
            <div *ngIf="item.showDetails" class="details-box">
                <strong>ID:</strong> {{ item.details?.id }}<br>
                <strong>Modello:</strong> {{ item.details?.modello }}<br>
                <strong>Marca:</strong> {{ item.details?.marca }}
            </div>
        </li>
        </ul>
        <button class="note-button" (click)="navigateToNotes()">Vai a Gestione Note</button>
    </div>
  `,
  styles: [   
    `.loading { font-size: 1.2em; color: gray; }`,
    `.error { color: red; font-weight: bold; }`,
    `ul { list-style-type: none; padding: 0; }`,
    `li { margin-bottom: 1em; position: relative; }`,
    `.info-button { background-color: #007bff; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; font-size: 1em; cursor: pointer; }`,
    `.info-button:hover { background-color: #0056b3; }`,
    `.details-box { margin-top: 10px; padding: 10px; border: 1px solid black; background-color: #e0f7fa; }`,
    `.note-button { margin-top: 20px; padding: 10px 20px; background-color: #28a745; color: white; border: none; cursor: pointer; border-radius: 5px; font-size: 1em; }`,
    `.note-button:hover { background-color: #218838; }`
],
})

export class SensoriListViewComponent {
  lists: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private dataService: DataService, private router: Router) {
    this.fetchLists();
  }

  fetchLists(): void {
    this.dataService.getSensori().subscribe(
      (data) => {
        this.lists = data.map(item => ({ ...item, showDetails: false, details: null }));
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Errore nel caricamento dei dati';
        this.isLoading = false;
      }
    );
    
  }

  toggleDetails(sensoreId: number): void { // Cambiato tipo di sensoreId a number
    const sensore = this.lists.find(item => item.id === sensoreId);
    if (sensore) {
      if (sensore.showDetails) {
        sensore.showDetails = false;
      } else {
        this.dataService.getSensoreDetails(sensoreId).subscribe(
          (details) => {
            sensore.details = details;
            sensore.showDetails = true;
          },
          (error) => {
            this.errorMessage = 'Errore nel caricamento dei dettagli';
          }
        );
      }
    }
  }
  
  navigateToNotes(): void {
    this.router.navigate(['/note-management']).then(success => {
      if (!success) {
        console.error('Navigazione fallita');
      }
    });
  }
  

}
