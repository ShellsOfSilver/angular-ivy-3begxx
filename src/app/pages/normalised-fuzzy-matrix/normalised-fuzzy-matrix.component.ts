import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-normalised-fuzzy-matrix",
  templateUrl: "./normalised-fuzzy-matrix.component.html",
  styleUrls: ["./normalised-fuzzy-matrix.component.css"]
})
export class NormalisedFuzzyMatrixComponent {
  constructor(public dataService: DataService) {}
}
