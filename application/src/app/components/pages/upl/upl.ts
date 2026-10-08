import { Component } from '@angular/core';
import { Header } from '../../header/header';


@Component({
  selector: 'app-apl',
  imports: [Header],
  templateUrl: './upl.html',
  styleUrl: './upl.css'
})
export class Upl {
  selectedFile: File | null = null;

  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }
  removeFile() {
    this.selectedFile = null;
  }

}