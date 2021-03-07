import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-triangular-fuzzy-numbers",
  templateUrl: "./triangular-fuzzy-numbers.component.html",
  styleUrls: ["./triangular-fuzzy-numbers.component.css"]
})
export class TriangularFuzzyNumbersComponent {
  constructor(public dataService: DataService) {}
}
