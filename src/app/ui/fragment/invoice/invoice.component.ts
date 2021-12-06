import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @Input() invoice: any = {}

  constructor() { }

  ngOnInit(): void {
  }

}
