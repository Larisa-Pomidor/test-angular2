import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  constructor(private dataService: DataService) {}

  formData = {
    front: '',
    back: '',
    imageUrl: ''
  }

  submitForm() {
    this.dataService.addCard(this.formData);
  }
}
