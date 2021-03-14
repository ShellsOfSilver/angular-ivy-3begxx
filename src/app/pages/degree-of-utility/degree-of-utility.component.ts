import { Component } from "@angular/core";

import { DataService } from "../../data.service";

@Component({
  selector: "app-degree-of-utility",
  templateUrl: "./degree-of-utility.component.html",
  styleUrls: ["./degree-of-utility.component.css"]
})
export class DegreeOfUtilityComponent {
  constructor(public dataService: DataService) {}
}
