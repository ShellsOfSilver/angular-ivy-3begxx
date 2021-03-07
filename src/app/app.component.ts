import { Component, OnInit } from "@angular/core";

import { DataService } from "./data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.initForm();
  }

  test(stepper) {
    // setTimeout(() => {
    //   this.dataService.setInitRandom();
    //   setTimeout(() => {
    //     this.dataService.setLinguisticTerms();
    //     stepper.next();
    //     this.dataService.setLinguisticRandom();
    //     setTimeout(() => {
    //       this.dataService.setExpertMatrix();
    //       stepper.next();
    //       this.dataService.setMatrixRandom();
    //       setTimeout(() => {
    //         this.dataService.checkExpertMatrix(stepper);
    //         setTimeout(() => {
    //           this.dataService.setTrapezoidalMatrix();
    //           stepper.next();
    //           stepper.next();
    //           this.dataService.setAggregationMethods();
    //           this.dataService.calcMethod();
    //           stepper.next();
    //         }, 200);
    //       }, 200);
    //     }, 200);
    //   }, 200);
    // });
  }
}
