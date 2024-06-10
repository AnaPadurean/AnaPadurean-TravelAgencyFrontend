import { Component, OnInit } from '@angular/core';
import { ContinentsService, Continent } from 'src/app/demo/service/continents.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-continents',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss']
})
export class ContinentsComponent implements OnInit {
  continents: Continent[] = [];
  newContinent: Continent = { continent_id: 0, continent_name: '' };
  loading: boolean = true;

  constructor(private continentsService: ContinentsService) {}

  ngOnInit() {
    console.log("Calling getContinents() method...");
    this.continentsService.getContinents().subscribe(
      data => {
        console.log('Continents received:', data);
        this.continents = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching continents', error);
        this.loading = false;
      }
    );
  }

  addContinent() {
    this.continentsService.addContinent(this.newContinent).subscribe(
      data => {
        console.log('New continent added:', data);
        this.continents.push(data);  // Adăugăm noul continent în listă
        this.newContinent = { continent_id: 0, continent_name: '' };  // Resetăm formularul
      },
      error => {
        console.error('Error adding continent', error);
      }
    );
  }

  deleteContinent(continentId: number) {
  this.continentsService.deleteContinent(continentId).subscribe(
    () => {
      console.log(`Continent deleted successfully`);
      // Remove the continent from the list
      const index = this.continents.findIndex(c => c.continent_id === continentId);
      if (index !== -1) {
        this.continents.splice(index, 1);
      }
    },
    error => {
      console.error(`Error deleting continent: ${error.message}`);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  );
}
  

  onGlobalFilter(event: Event, table: any) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  clear(table: any) {
    table.clear();
  }
}
