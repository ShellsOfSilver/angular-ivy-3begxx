import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "my-calc-res",
  templateUrl: "./calc-res.component.html",
  styleUrls: ["./calc-res.component.css"]
})
export class CalcResComponent {
  constructor(public dataService: DataService) {}
}
