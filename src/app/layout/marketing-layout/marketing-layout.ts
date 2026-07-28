import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-marketing-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './marketing-layout.html',
  styleUrl: './marketing-layout.scss',
})
export class MarketingLayout {

}
