import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recovery-two',
  templateUrl: './recovery-two.page.html',
  styleUrls: ['./recovery-two.page.scss'],
})
export class RecoveryTwoPage implements OnInit {

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      const receivedData = params;
      console.log(receivedData); 
    });
  }

}
