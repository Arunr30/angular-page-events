import { Component, OnInit } from '@angular/core';
import { Page } from '../../../model/pges.model';
import { PageService } from '../../service/page-service';

@Component({
  selector: 'app-response-pagetwo',
  imports: [],
  templateUrl: './response-pagetwo.html',
  styleUrl: './response-pagetwo.css',
})
export class ResponsePagetwo implements OnInit {

  pages: Page[] = [];
  constructor(private pageService : PageService) {}

  ngOnInit() {
    this.pageService.getPages().subscribe({
      next: (res) => {
        this.pages = res;
        console.log('Pages API response', res);
        
      },
      error: (err) => {
        console.error('Pages API error', err);
        
      }
    })
  }


}
