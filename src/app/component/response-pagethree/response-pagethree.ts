import { Component, OnInit } from '@angular/core';
import { ControlInstance } from '../../../model/control.instance.model';
import { ControlInstanceService } from '../../service/control-instance';

@Component({
  selector: 'app-response-pagethree',
  imports: [],
  templateUrl: './response-pagethree.html',
  styleUrl: './response-pagethree.css',
})
export class ResponsePagethree implements OnInit{

  controls: ControlInstance[] = [];

  constructor(private service : ControlInstanceService) {};

   ngOnInit() {
    this.service.getControlInstances().subscribe({
      next: (res) => {
        this.controls = res;
        console.log('Control instances:', res);
      },
      error: (err) => console.error(err)
    });
  }
}
