import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-normalized-weighted-fuzzy-matrix",
  templateUrl: "./normalized-weighted-fuzzy-matrix.component.html",
  styleUrls: ["./normalized-weighted-fuzzy-matrix.component.css"]
})
export class NormalizedWeightedFuzzyMatrixComponent {
  constructor(public dataService: DataService) {}
}
