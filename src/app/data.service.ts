import { Injectable } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class DataService {
  initFormGroup: FormGroup;
  importanceCriteriaForm: FormGroup;
  importanceCriteriaTable: {
    columns: Array<string>;
    dataSource: any;
  };
  expertMatrixForm: FormGroup;
  expertMatrixTable: Array<{
    columns: Array<string>;
    dataSource: any;
  }>;
  aggregationMatrixTable: {
    columns: Array<string>;
    dataSource: any;
  };
  triangularFuzzyCriteriaTable: {
    columns: Array<string>;
    dataSource: any;
  };
  triangularFuzzyExpertsTable: {
    columns: Array<string>;
    dataSource: any;
  };

  listOfCriterias: any = [
    { value: "VL", viewValue: "Very low (VL)", trValue: [0.0, 0.0, 0.1] },
    { value: "L", viewValue: "Low (L)", trValue: [0.0, 0.1, 0.3] },
    { value: "ML", viewValue: "Medium low (ML)", trValue: [0.1, 0.3, 0.5] },
    { value: "M", viewValue: "Medium (M)", trValue: [0.3, 0.5, 0.7] },
    { value: "MH", viewValue: "Medium high (MH)", trValue: [0.5, 0.7, 0.9] },
    { value: "H", viewValue: "High (H)", trValue: [0.7, 0.7, 1.0] },
    { value: "VH", viewValue: "Very high (VH)", trValue: [0.9, 1.0, 1.0] }
  ];

  listOfExpertAssesments: any = [
    { value: "VP", viewValue: "Very poor (VP)", trValue: [0.0, 0.0, 0.1] },
    { value: "P", viewValue: "Poor (P)", trValue: [0.0, 0.1, 0.3] },
    { value: "MP", viewValue: "Medium poor (MP)", trValue: [0.1, 0.3, 0.5] },
    { value: "F", viewValue: "Fair (F)", trValue: [0.3, 0.5, 0.7] },
    { value: "MG", viewValue: "Medium good (MG)", trValue: [0.5, 0.7, 0.9] },
    { value: "G", viewValue: "Good (G)", trValue: [0.7, 0.7, 1.0] },
    { value: "VG", viewValue: "Very good (VG)", trValue: [0.9, 1.0, 1.0] }
  ];

  constructor(private _formBuilder: FormBuilder) {}

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  initForm() {
    this.initFormGroup = this._formBuilder.group({
      numberAlternatives: ["", Validators.min(3)],
      numberCriteria: ["", Validators.min(3)],
      numberExperts: ["", Validators.min(3)]
    });
  }

  setInitRandom() {
    this.initFormGroup.setValue({
      numberAlternatives: 4,
      numberCriteria: 5,
      numberExperts: 4
    });
  }

  setImportanceCriteria() {
    this.importanceCriteriaTable = null;
    const form = this._formBuilder.group({});
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberExperts = this.initFormGroup.get("numberExperts").value;

    const columns = ["none"];
    const dataSource = [];

    for (let i = 0; i < numberCriteria; i++) {
      columns.push(`C${i + 1}`);
    }

    for (let i = 0; i < numberExperts; i++) {
      const sub = {};

      columns.forEach((e, ix) => {
        if (e === "none") {
          sub[e] = {
            data: `E${i + 1}`,
            start: true,
            id: `${i}_${ix}`
          };
        } else {
          sub[e] = {
            data: i,
            id: `${i}_${ix}`
          };
          form.addControl(`${i}_${ix}`, new FormControl(""));
        }
      });
      dataSource.push(sub);
    }

    this.importanceCriteriaForm = form;
    this.importanceCriteriaTable = {
      columns,
      dataSource
    };
  }

  setImportanceRandom() {
    const res = {};
    const form = this.importanceCriteriaForm.value;
    Object.keys(form).forEach(key => {
      const atl = Object.keys(this.listOfCriterias);
      const inx = this.randomInteger(0, atl.length - 1);
      res[key] = this.listOfCriterias[atl[inx]].value;
    });
    this.importanceCriteriaForm.setValue(res);
  }

  setMatrixRandom() {
    const res = {};
    const form = this.expertMatrixForm.value;
    Object.keys(form).forEach(key => {
      const atl = Object.keys(this.listOfExpertAssesments);
      const inx = this.randomInteger(0, atl.length - 1);
      res[key] = this.listOfExpertAssesments[atl[inx]].value;
    });
    this.expertMatrixForm.setValue(res);
  }

  setExpertMatrix() {
    this.expertMatrixTable = [];
    const form = this._formBuilder.group({});
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberExperts = this.initFormGroup.get("numberExperts").value;
    const numberAlternatives = this.initFormGroup.get("numberAlternatives")
      .value;

    for (let inx = 0; inx < numberExperts; inx++) {
      const columns = ["none"];
      const dataSource = [];

      for (let i = 0; i < numberCriteria; i++) {
        columns.push(`C${i + 1}`);
      }

      for (let i = 0; i < numberAlternatives; i++) {
        const sub = {};

        columns.forEach((e, ix) => {
          if (e === "none") {
            sub[e] = {
              data: `A${i + 1}`,
              start: true,
              id: `${inx}_${i}_${ix}`
            };
          } else {
            sub[e] = {
              data: i,
              id: `${inx}_${i}_${ix}`
            };
            form.addControl(`${inx}_${i}_${ix}`, new FormControl(""));
          }
        });
        dataSource.push(sub);
      }

      this.expertMatrixTable.push({
        columns,
        dataSource
      });
    }
    this.expertMatrixForm = form;
  }

  setAggregationMatrix() {
    this.aggregationMatrixTable = null;
    const form = this.expertMatrixForm.value;
    const numberCriteria = this.initFormGroup.get("numberCriteria").value;
    const numberAlternatives = this.initFormGroup.get("numberAlternatives")
      .value;

    const columns = ["none"];
    const dataSource = [];

    for (let i = 0; i < numberCriteria; i++) {
      columns.push(`C${i + 1}`);
    }

    for (let i = 0; i < numberAlternatives; i++) {
      const sub = {};

      columns.forEach((e, ix) => {
        if (e === "none") {
          sub[e] = {
            data: `E${i + 1}`,
            start: true,
            id: `${i}_${ix}`
          };
        } else {
          const data = Object.keys(form)
            .filter(key => {
              const subs = key.split("_");
              if (+subs[1] === i && +subs[2] === ix) {
                return true;
              }
              return false;
            })
            .map(key => {
              return form[key];
            });
          sub[e] = {
            data: JSON.stringify(data),
            id: `${i}_${ix}`
          };
        }
      });
      dataSource.push(sub);
    }

    this.aggregationMatrixTable = {
      columns,
      dataSource
    };
  }

  setTriangularFuzzyNumbers() {
    this.triangularFuzzyExpertsTable = null;
    this.triangularFuzzyCriteriaTable = null;
    const form = this.importanceCriteriaForm.value;

    this.triangularFuzzyExpertsTable = {
      columns: this.aggregationMatrixTable.columns,
      dataSource: this.aggregationMatrixTable.dataSource.map(res => {
        Object.keys(res).forEach(key => {
          const val = res[key];

          if (val.data.startsWith("[")) {
            val.data = JSON.stringify(
              JSON.parse(val.data).map(e => {
                return this.listOfExpertAssesments.find(k => k.value === e)
                  .trValue;
              })
            );
          } else {
            val.data = val.data.replace("E", "A");
          }
        });
        return res;
      })
    };

    this.triangularFuzzyCriteriaTable = {
      columns: this.importanceCriteriaTable.columns,
      dataSource: this.importanceCriteriaTable.dataSource.map(res => {
        Object.keys(res).forEach(key => {
          const val = res[key];
          if (!`${val.data}`.startsWith("E")) {
            val.data = JSON.stringify(
              this.listOfCriterias.find(e => e.value === form[val.id]).trValue
            );
          }
        });
        return res;
      })
    };
  }

  // setLinguisticTerms() {
  //   const col = this.initFormGroup.get("numberLT").value;
  //   this.linguisticTermsForm = new FormArray([]);

  //   for (let i = 0; i < col; i++) {
  //     this.linguisticTermsForm.push(this.getLinguisticTerm());
  //   }
  // }

  // setAggregationMethods() {
  //   this.aggregationMethodsForm = this._formBuilder.group({
  //     alpha: [0.5, [Validators.min(0), Validators.max(1)]],
  //     method: ["Aggregation of generalized trapezoidal LT", Validators.required]
  //   });
  // }

  // setConclusion(prob) {
  //   console.log(prob);
  //   const maxV = Math.max.apply(
  //     Math,
  //     prob.map(function(o) {
  //       return o.res;
  //     })
  //   );
  //   const resAlt = [];
  //   prob.forEach(e => {
  //     if (e.res === maxV) {
  //       resAlt.push(e.alt);
  //     }
  //   });
  //   const method = this.aggregationMethodsForm.value;
  //   this.conclusion = `As a result of performing the method '${
  //     method.method
  //   }' the best alternative is the alternative '${resAlt.join(
  //     ", "
  //   )}' with a probability of ${maxV.toFixed(2)}`;
  // }

  // calcMethod() {
  //   this.resultMatrixTable = null;
  //   const method = this.aggregationMethodsForm.value;
  //   const alpha = method.alpha;

  //   const numberCriteria = this.initFormGroup.get("numberCriteria").value;
  //   const numberAlternatives = this.initFormGroup.get("numberAlternatives")
  //     .value;

  //   const data = [];

  //   this.linguisticTermsForm.value.forEach(e => {
  //     data.push(e.shortName);
  //   });

  //   const columns = ["none"];
  //   const dataSource = [];
  //   for (let i = 0; i < numberCriteria; i++) {
  //     columns.push(`Q${i + 1}`);
  //   }
  //   const intervalData = this.trapezoidalMatrixTable.dataSource;
  //   for (let i = 0; i < numberAlternatives; i++) {
  //     const sub = {};
  //     columns.forEach((e, ix) => {
  //       if (e === "none") {
  //         sub[e] = {
  //           data: `E${i + 1}`,
  //           start: true,
  //           id: `${i}_${ix}`
  //         };
  //       } else {
  //         const el = (Object.values(intervalData[i]).find(
  //           (e: any) => e.id === `${i}_${ix}`
  //         ) as any).data;
  //         const elements = el.substring(2, el.length - 2).split(" ");
  //         const res = [
  //           +(alpha * (+elements[1] - +elements[0]) + +elements[0]).toFixed(3),
  //           +(+elements[3] - alpha * (+elements[3] - +elements[2])).toFixed(3)
  //         ];
  //         sub[e] = {
  //           data: `[ ${res.join(" ")} ]`,
  //           id: `${i}_${ix}`
  //         };
  //       }
  //     });
  //     dataSource.push(sub);
  //   }

  //   const prob = [];

  //   switch (method.method) {
  //     case "Aggregation of generalized trapezoidal LT":
  //       const colGS = "GS";
  //       const col11 = "Fuzzy interval";
  //       columns.push(colGS);
  //       columns.push(col11);
  //       columns.push("Probability");
  //       for (let i = 0; i < numberAlternatives; i++) {
  //         const trapezoid = Object.values(
  //           this.trapezoidalMatrixTable.dataSource[i]
  //         )
  //           .filter((kk: any) => !kk.start)
  //           .map((kk: any) =>
  //             kk.data.substring(2, kk.data.length - 2).split(" ")
  //           );
  //         const gs = [1, 1, 0, 0];

  //         trapezoid.forEach(k => {
  //           console.log(k);
  //           if (gs[0] > +k[0]) {
  //             gs[0] = +k[0];
  //           }
  //           if (gs[1] > +k[1]) {
  //             gs[1] = +k[1];
  //           }
  //           if (gs[2] < +k[2]) {
  //             gs[2] = +k[2];
  //           }
  //           if (gs[3] < +k[3]) {
  //             gs[3] = +k[3];
  //           }
  //         });

  //         const fuzz = [
  //           +(alpha * (+gs[1] - +gs[0]) + +gs[0]).toFixed(3),
  //           +(+gs[3] - alpha * (+gs[3] - +gs[2])).toFixed(3)
  //         ];

  //         dataSource[i][colGS] = {
  //           data: `[ ${gs.join(" ")} ]`,
  //           id: `${i}_${dataSource.length}`
  //         };

  //         dataSource[i][col11] = {
  //           data: `[ ${fuzz.join(" ")} ]`,
  //           id: `${i}_${dataSource.length}`
  //         };

  //         const calc = Math.max(
  //           0,
  //           1 - Math.max(0, (1 - fuzz[0]) / (fuzz[1] - fuzz[0] + 1))
  //         );

  //         prob.push({
  //           res: calc,
  //           alt: dataSource[i]["none"].data
  //         });

  //         dataSource[i]["Probability"] = {
  //           data: `${calc.toFixed(2)}`,
  //           id: `${i}_${dataSource.length}`
  //         };
  //       }
  //       break;
  //     case "Pessimistic position":
  //       const col1 = "Pessimistic fuzzy interval";
  //       columns.push(col1);
  //       columns.push("Probability");

  //       for (let i = 0; i < numberAlternatives; i++) {
  //         const el = dataSource[i];
  //         const res = [1, 1];

  //         Object.keys(el).forEach(key => {
  //           if (!el[key].start) {
  //             const elements = el[key].data
  //               .substring(2, el[key].data.length - 2)
  //               .split(" ");

  //             if (res[0] > +elements[0]) {
  //               res[0] = +elements[0];
  //             }

  //             if (res[1] > +elements[1]) {
  //               res[1] = +elements[1];
  //             }
  //           }
  //         });
  //         dataSource[i][col1] = {
  //           data: `[ ${res.join(" ")} ]`,
  //           id: `${i}_${dataSource.length}`
  //         };

  //         const calc = Math.max(
  //           0,
  //           1 - Math.max(0, (1 - res[0]) / (res[1] - res[0] + 1))
  //         );

  //         prob.push({
  //           res: calc,
  //           alt: dataSource[i]["none"].data
  //         });

  //         dataSource[i]["Probability"] = {
  //           data: `${calc.toFixed(2)}`,
  //           id: `${i}_${dataSource.length + 1}`
  //         };
  //       }
  //       break;
  //     case "Optimistic position":
  //       const col2 = "Optimistic fuzzy interval";
  //       columns.push(col2);
  //       columns.push("Probability");

  //       for (let i = 0; i < numberAlternatives; i++) {
  //         const el = dataSource[i];
  //         const res = [0, 0];

  //         Object.keys(el).forEach(key => {
  //           if (!el[key].start) {
  //             const elements = el[key].data
  //               .substring(2, el[key].data.length - 2)
  //               .split(" ");

  //             if (res[0] < +elements[0]) {
  //               res[0] = +elements[0];
  //             }

  //             if (res[1] < +elements[1]) {
  //               res[1] = +elements[1];
  //             }
  //           }
  //         });
  //         dataSource[i][col2] = {
  //           data: `[ ${res.join(" ")} ]`,
  //           id: `${i}_${dataSource.length}`
  //         };

  //         const calc = Math.max(
  //           0,
  //           1 - Math.max(0, (1 - res[0]) / (res[1] - res[0] + 1))
  //         );

  //         prob.push({
  //           res: calc,
  //           alt: dataSource[i]["none"].data
  //         });

  //         dataSource[i]["Probability"] = {
  //           data: `${calc.toFixed(2)}`,
  //           id: `${i}_${dataSource.length + 1}`
  //         };
  //       }
  //       break;
  //   }

  //   this.resultMatrixTable = {
  //     columns,
  //     dataSource
  //   };
  //   this.setConclusion(prob);
  // }

  // getLinguisticTermByIndex(index: number) {
  //   return this.linguisticTermsForm.at(index) as FormGroup;
  // }

  // getNormLinguisticTerms() {
  //   const form = this.linguisticTermsForm.controls;
  //   const data = [];
  //   const data1D = [];

  //   form.forEach(e => {
  //     data.push([
  //       e.value.range.low,
  //       e.value.range.medium,
  //       e.value.range.height
  //     ]);
  //     data1D.push(e.value.range.low);
  //     data1D.push(e.value.range.medium);
  //     data1D.push(e.value.range.height);
  //   });

  //   const min = Math.min(...data1D);
  //   const max = Math.max(...data1D);

  //   return data.map(e => {
  //     const sub = e.map(el => {
  //       return (el - min) / (max - min);
  //     });
  //     return sub;
  //   });
  // }

  // private getLinguisticTerm(): FormGroup {
  //   return this._formBuilder.group({
  //     fullName: [""],
  //     shortName: [""],
  //     range: this._formBuilder.group({
  //       low: [""],
  //       medium: [""],
  //       height: [""]
  //     })
  //   });
  // }

  // setMatrixRandom() {
  //   const form = this.linguisticTermsForm.controls;
  //   const data = [];

  //   form.forEach(e => {
  //     data.push(e.value.shortName);
  //   });

  //   Object.keys(this.expertMatrixForm.controls).forEach(e => {
  //     const sCase = this.randomInteger(0, 3);

  //     if (sCase === 0) {
  //       const index = this.randomInteger(0, data.length - 1);
  //       this.expertMatrixForm.get(e).setValue(`${data[index]}`);
  //     }
  //     if (sCase === 1) {
  //       const index = this.randomInteger(0, data.length - 2);
  //       this.expertMatrixForm.get(e).setValue(`above ${data[index]}`);
  //     }
  //     if (sCase === 2) {
  //       const index = this.randomInteger(1, data.length - 1);
  //       this.expertMatrixForm.get(e).setValue(`below ${data[index]}`);
  //     }
  //     if (sCase === 3) {
  //       let index = this.randomInteger(0, data.length - 1);
  //       let index1 = this.randomInteger(0, data.length - 1);
  //       if (index1 !== index) {
  //         this.expertMatrixForm
  //           .get(e)
  //           .setValue(`within ${data[index1]} and ${data[index]}`);
  //       } else {
  //         this.expertMatrixForm
  //           .get(e)
  //           .setValue(`within ${data[0]} and ${data[1]}`);
  //       }
  //     }
  //   });
  // }

  // setTrapezoidalMatrix() {
  //   this.trapezoidalMatrixTable = null;
  //   const numberCriteria = this.initFormGroup.get("numberCriteria").value;
  //   const numberAlternatives = this.initFormGroup.get("numberAlternatives")
  //     .value;

  //   const data = [];

  //   this.linguisticTermsForm.value.forEach(e => {
  //     data.push(e.shortName);
  //   });

  //   const columns = ["none"];
  //   const dataSource = [];
  //   for (let i = 0; i < numberCriteria; i++) {
  //     columns.push(`Q${i + 1}`);
  //   }
  //   const intervalData = this.intervalMatrixTable.dataSource;
  //   const normList = this.getNormLinguisticTerms();
  //   for (let i = 0; i < numberAlternatives; i++) {
  //     const sub = {};
  //     columns.forEach((e, ix) => {
  //       if (e === "none") {
  //         sub[e] = {
  //           data: `E${i + 1}`,
  //           start: true,
  //           id: `${i}_${ix}`
  //         };
  //       } else {
  //         const el = (Object.values(intervalData[i]).find(
  //           (e: any) => e.id === `${i}_${ix}`
  //         ) as any).data;
  //         const elements = el.substring(2, el.length - 2).split(" ");
  //         let res = [];

  //         if (elements.length === 1) {
  //           const inx = data.indexOf(elements[0]);
  //           res = normList[inx];
  //           sub[e] = {
  //             data: `[ ${res[0].toFixed(2)} ${res[1].toFixed(
  //               2
  //             )} ${res[1].toFixed(2)} ${res[res.length - 1].toFixed(2)} ]`,
  //             id: `${i}_${ix}`
  //           };
  //         } else {
  //           elements.forEach(e => {
  //             const inx = data.indexOf(e);
  //             res = [...res, ...normList[inx]];
  //           });

  //           sub[e] = {
  //             data: `[ ${res[0].toFixed(2)} ${res[1].toFixed(2)} ${res[
  //               res.length - 2
  //             ].toFixed(2)} ${res[res.length - 1].toFixed(2)} ]`,
  //             id: `${i}_${ix}`
  //           };
  //         }
  //       }
  //     });
  //     dataSource.push(sub);
  //   }
  //   this.trapezoidalMatrixTable = {
  //     columns,
  //     dataSource
  //   };
  // }

  // checkExpertMatrix(stepper) {
  //   let valid = true;
  //   let logical = true;
  //   const form = this.linguisticTermsForm.value;
  //   const data = [];

  //   form.forEach(e => {
  //     data.push(e.shortName);
  //   });

  //   Object.keys(this.expertMatrixForm.controls).forEach(e => {
  //     const value = this.expertMatrixForm.get(e).value;
  //     const terms = value.split(" ");
  //     if (terms.length === 1) {
  //       if (data.indexOf(terms[0]) === -1) {
  //         valid = false;
  //       }
  //     } else if (terms.length === 2) {
  //       if (["above", "below"].indexOf(terms[0]) === -1) {
  //         valid = false;
  //       }
  //       if (data.indexOf(terms[1]) === -1) {
  //         valid = false;
  //       }
  //       if (data.indexOf(terms[1]) !== -1) {
  //         const subInx = data.indexOf(terms[1]);

  //         if (terms[0] === "below" && subInx <= 0) {
  //           logical = false;
  //           valid = false;
  //         }
  //         if (terms[0] === "above" && subInx >= data.length - 1) {
  //           logical = false;
  //           valid = false;
  //         }
  //       }
  //     } else if (terms.length === 4) {
  //       if (terms[0] !== "within") {
  //         valid = false;
  //       }
  //       if (data.indexOf(terms[1]) === -1) {
  //         valid = false;
  //       }
  //       if (terms[2] !== "and") {
  //         valid = false;
  //       }
  //       if (data.indexOf(terms[3]) === -1) {
  //         valid = false;
  //       }
  //       if (terms[3] === terms[1]) {
  //         logical = false;
  //         valid = false;
  //       }
  //     } else {
  //       valid = false;
  //     }
  //   });
  //   if (valid) {
  //     this.setIntervalMatrix();
  //     stepper.next();
  //   } else {
  //     this._snackBar.open(logical ? "Invalid data." : "Logic error", null, {
  //       duration: 2000
  //     });
  //   }
  // }

  // setIntervalMatrix() {
  //   this.intervalMatrixTable = null;
  //   const numberCriteria = this.initFormGroup.get("numberCriteria").value;
  //   const numberAlternatives = this.initFormGroup.get("numberAlternatives")
  //     .value;

  //   const data = [];

  //   this.linguisticTermsForm.value.forEach(e => {
  //     data.push(e.shortName);
  //   });

  //   const columns = ["none"];
  //   const dataSource = [];
  //   for (let i = 0; i < numberCriteria; i++) {
  //     columns.push(`Q${i + 1}`);
  //   }
  //   const form = this.expertMatrixForm.value;

  //   for (let i = 0; i < numberAlternatives; i++) {
  //     const sub = {};
  //     columns.forEach((e, ix) => {
  //       if (e === "none") {
  //         sub[e] = {
  //           data: `E${i + 1}`,
  //           start: true,
  //           id: `${i}_${ix}`
  //         };
  //       } else {
  //         const value = form[`${i}_${ix}`];

  //         const terms = value.split(" ");
  //         if (terms.length === 1) {
  //           sub[e] = {
  //             data: `{ ${terms[0]} }`,
  //             id: `${i}_${ix}`
  //           };
  //         } else if (terms.length === 2) {
  //           const subIx = data.indexOf(terms[1]);
  //           if ("above" === terms[0]) {
  //             sub[e] = {
  //               data: `{ ${terms[1]} ${data
  //                 .slice(subIx + 1, data.length)
  //                 .join(" ")} }`,
  //               id: `${i}_${ix}`
  //             };
  //           } else if ("below" === terms[0]) {
  //             sub[e] = {
  //               data: `{ ${data.slice(0, subIx).join(" ")} ${terms[1]} }`,
  //               id: `${i}_${ix}`
  //             };
  //           } else {
  //             sub[e] = {
  //               data: "{ }",
  //               id: `${i}_${ix}`
  //             };
  //           }
  //         } else if (terms.length === 4) {
  //           const subIx1 = data.indexOf(terms[1]);
  //           const subIx2 = data.indexOf(terms[3]);
  //           sub[e] = {
  //             data: `{ ${data
  //               .slice(Math.min(subIx1, subIx2), Math.max(subIx1, subIx2) + 1)
  //               .join(" ")} }`,
  //             id: `${i}_${ix}`
  //           };
  //         } else {
  //           sub[e] = {
  //             data: "{ }",
  //             id: `${i}_${ix}`
  //           };
  //         }
  //       }
  //     });
  //     dataSource.push(sub);
  //   }

  //   this.intervalMatrixTable = {
  //     columns,
  //     dataSource
  //   };
  // }

  // setLinguisticRandom() {
  //   let index = 0;
  //   for (let control of this.linguisticTermsForm.controls) {
  //     index++;
  //     control.setValue({
  //       fullName: `Full Name ${index}`,
  //       shortName: `SN${index}`,
  //       range: {
  //         low: (index - 1) * 25,
  //         medium: index * 25,
  //         height: (index + 1) * 25
  //       }
  //     });
  //   }
  // }
}
