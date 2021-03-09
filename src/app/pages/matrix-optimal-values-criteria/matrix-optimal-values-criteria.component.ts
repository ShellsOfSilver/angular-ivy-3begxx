import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-matrix-optimal-values-criteria",
  templateUrl: "./matrix-optimal-values-criteria.component.html",
  styleUrls: ["./matrix-optimal-values-criteria.component.css"]
})
export class MatrixOptimalValuesCriteriaComponent {
  constructor(public dataService: DataService) {}
}
