import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-fuzzy-numbers-transformed-linguistic-terms",
  templateUrl: "./fuzzy-numbers-transformed-linguistic-terms.component.html",
  styleUrls: ["./fuzzy-numbers-transformed-linguistic-terms.component.css"]
})
export class FuzzyNumbersTransformedLinguisticTermsComponent {
  constructor(public dataService: DataService) {}
}
