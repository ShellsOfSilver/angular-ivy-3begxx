import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-overall-interval-valued-fuzzy-performance-rating",
  templateUrl:
    "./overall-interval-valued-fuzzy-performance-rating.component.html",
  styleUrls: [
    "./overall-interval-valued-fuzzy-performance-rating.component.css"
  ]
})
export class OverallIntervalValuedFuzzyPerformanceRatingComponent {
  constructor(public dataService: DataService) {}
}
