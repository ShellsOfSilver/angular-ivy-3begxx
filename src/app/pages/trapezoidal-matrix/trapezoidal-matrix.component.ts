import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "my-trapezoidal-matrix",
  templateUrl: "./trapezoidal-matrix.component.html",
  styleUrls: ["./trapezoidal-matrix.component.css"]
})
export class TrapezoidalMatrixComponent {
  constructor(public dataService: DataService) {}
}
