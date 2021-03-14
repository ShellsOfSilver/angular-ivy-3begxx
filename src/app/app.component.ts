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
    setTimeout(() => {
      this.dataService.setInitRandom();
      this.dataService.setImportanceCriteria();
      stepper.next();
      setTimeout(() => {
        this.dataService.setImportanceRandom();
        this.dataService.setExpertMatrix();
        stepper.next();
        setTimeout(() => {
          this.dataService.setMatrixRandom();
          this.dataService.setAggregationMatrix();
          stepper.next();
          setTimeout(() => {
            this.dataService.setTriangularFuzzyNumbers();
            stepper.next();
            setTimeout(() => {
              this.dataService.setFuzzyNumbersTransformedLinguisticTerms();
              stepper.next();
              setTimeout(() => {
                this.dataService.setMatrixOptimalValuesCriteria();
                stepper.next();
                setTimeout(() => {
                  this.dataService.setNotmalisedFuzzyMatrix();
                  stepper.next();
                  setTimeout(() => {
                    this.dataService.setNormalizedWMatrix();
                    stepper.next();
                    setTimeout(() => {
                      this.dataService.setoOerallIntervalValuedFuzzyPerformanceRating();
                      stepper.next();
                      setTimeout(() => {
                        this.dataService.setDefuzzification();
                        stepper.next();
                        setTimeout(() => {
                          this.dataService.setDegreeOfUtility();
                          stepper.next();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
