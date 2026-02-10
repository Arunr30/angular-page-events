import { Component, OnInit } from '@angular/core';
import { PublishedDataSource } from '../../../model/response.model';
import { ApiService } from '../../service/api-service';

@Component({
  selector: 'app-response',
  imports: [],
  templateUrl: './TestPageComponent.html',
  styleUrl: './TestPageComponent.css',
})
export class TestPageComponent implements OnInit{

  published: PublishedDataSource[] = [];

  constructor(private ds : ApiService){}

  ngOnInit(){
    this.ds.getDrafts().subscribe({
      next: (res: PublishedDataSource[]) => {
        this.published = res
        console.log('api response', res);
        
      },
      error: (err) => {
        console.error(err)
      }
    })
    
  }

}
