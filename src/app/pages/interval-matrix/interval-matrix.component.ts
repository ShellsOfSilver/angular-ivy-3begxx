import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "my-interval-matrix",
  templateUrl: "./interval-matrix.component.html",
  styleUrls: ["./interval-matrix.component.css"]
})
export class IntervalMatrixComponent {
  constructor(public dataService: DataService) {}
}
