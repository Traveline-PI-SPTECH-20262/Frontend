import { Component, OnInit } from '@angular/core';
import API_URL from '../../config';

@Component({
  selector: 'app-landing-layout',
  imports: [],
  templateUrl: './landing-layout.html',
  styleUrl: './landing-layout.css',
})
export class LandingLayout  {
  endpoint: string = API_URL;
}
