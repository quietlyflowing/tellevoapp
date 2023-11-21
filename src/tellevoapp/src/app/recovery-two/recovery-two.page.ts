import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recovery-two',
  templateUrl: './recovery-two.page.html',
  styleUrls: ['./recovery-two.page.scss'],
})
export class RecoveryTwoPage implements OnInit {

  constructor(private activated: ActivatedRoute) { }

  ngOnInit() {
    const queryParams = this.activated.snapshot['queryParams'];
    console.log(queryParams);
  }

}
