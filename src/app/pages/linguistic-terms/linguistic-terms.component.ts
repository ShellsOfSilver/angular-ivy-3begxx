import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "my-linguistic-terms",
  templateUrl: "./linguistic-terms.component.html",
  styleUrls: ["./linguistic-terms.component.css"]
})
export class LinguisticTermsComponent {
  constructor(public dataService: DataService) {}
}
