import { Component, signal } from '@angular/core';
import { ControlInstance } from '../../../model/control.instance.model';
import { ControlInstanceService } from '../../service/control-instance';

@Component({
  selector: 'app-response-pagethree',
  standalone: true,
  templateUrl: './response-pagethree.html',
  styleUrl: './response-pagethree.css',
})
export class ResponsePagethree {
  // controls = signal<ControlInstance[]>([]);
  // loading = signal(true);
  // constructor(private service: ControlInstanceService) {
  //   this.loadControls();
  // }
  // private loadControls() {
  //   this.service.getControlInstances().subscribe({
  //     next: (res) => {
  //       this.controls.set(res);
  //       this.loading.set(false);
  //       console.log('Control instances:', res);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.loading.set(false);
  //     }
  //   });
}
// }
