import { Injectable } from "@angular/core";
import {
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
  matrixFNTransformedLinguisticTermsCriteriaTable: {
    columns: Array<string>;
    dataSource: any;
  };
  matrixFNTransformedLinguisticTermsExpertsTable: {
    columns: Array<string>;
    dataSource: any;
  };
  matrixOptimalValueTable: {
    columns: Array<string>;
    dataSource: any;
  };

  notmalisedFuzzyMatrixTable: {
    columns: Array<string>;
    dataSource: any;
  };

  normalizedWMatrixTable: {
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
      const inx = this.randomInteger(2, atl.length - 1);
      res[key] = this.listOfCriterias[atl[inx]].value;
    });
    this.importanceCriteriaForm.setValue(res);
  }

  setMatrixRandom() {
    const res = {};
    const form = this.expertMatrixForm.value;
    Object.keys(form).forEach(key => {
      const atl = Object.keys(this.listOfExpertAssesments);
      const inx = this.randomInteger(2, atl.length - 1);
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
      columns: [...this.aggregationMatrixTable.columns],
      dataSource: JSON.parse(
        JSON.stringify(this.aggregationMatrixTable.dataSource)
      ).map(res => {
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
      columns: [...this.importanceCriteriaTable.columns],
      dataSource: JSON.parse(
        JSON.stringify(this.importanceCriteriaTable.dataSource)
      ).map(res => {
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

  setFuzzyNumbersTransformedLinguisticTerms() {
    this.matrixFNTransformedLinguisticTermsCriteriaTable = null;
    const dataSource = [];
    const critList = {};
    const sourceC = this.triangularFuzzyCriteriaTable.dataSource;
    const sourceE = this.triangularFuzzyExpertsTable.dataSource;

    sourceC.forEach(el => {
      Object.keys(el).forEach(sK => {
        if (sK !== "none") {
          const key = `${el["none"].data}`.replace("E", "C");
          const ids = `${el[sK].id}`.split("_");
          if (!critList["C" + ids[1]]) {
            critList["C" + ids[1]] = {};
          }
          critList["C" + ids[1]][key] = el[sK].data;
        }
      });
    });

    for (let i = 0; i < Object.keys(sourceC[0]).length - 1; i++) {
      const res = {};
      res["none"] = {
        id: i,
        start: true,
        data: "C" + (1 + i)
      };

      res["l"] = {
        id: i,
        data: Math.min(
          ...Object.values(critList["C" + (1 + i)]).map(
            (pp: string) => JSON.parse(pp)[0]
          )
        )
      };

      res["l`"] = {
        id: i,
        data: Math.pow(
          Object.values(critList["C" + (1 + i)])
            .map((pp: string) => JSON.parse(pp)[0])
            .reduce((a, b) => a * b, 1),
          1 / Object.values(critList["C" + (1 + i)]).length
        )
      };

      res["m"] = {
        id: i,
        data: Math.pow(
          Object.values(critList["C" + (1 + i)])
            .map((pp: string) => JSON.parse(pp)[1])
            .reduce((a, b) => a * b, 1),
          1 / Object.values(critList["C" + (1 + i)]).length
        )
      };

      res["u`"] = {
        id: i,
        data: Math.pow(
          Object.values(critList["C" + (1 + i)])
            .map((pp: string) => JSON.parse(pp)[2])
            .reduce((a, b) => a * b, 1),
          1 / Object.values(critList["C" + (1 + i)]).length
        )
      };

      res["u"] = {
        id: i,
        data: Math.max(
          ...Object.values(critList["C" + (1 + i)]).map(
            (pp: string) => JSON.parse(pp)[2]
          )
        )
      };

      dataSource.push(res);
    }

    this.matrixFNTransformedLinguisticTermsCriteriaTable = {
      columns: ["none", "l", "l`", "m", "u`", "u"],
      dataSource
    };

    const dataSourceExp = [];

    for (let j = 0; j < Object.keys(sourceE).length; j++) {
      for (let i = 0; i < Object.keys(sourceE[j]).length - 1; i++) {
        const res = {};
        res["none"] = {
          id: i,
          start: true,
          data: `A${1 + j}_C${1 + i}`
        };
        res["l"] = {
          id: i,
          data: Math.min(
            ...JSON.parse(sourceE[j][`C${1 + i}`].data).map(e => e[0])
          )
        };

        res["l`"] = {
          id: i,
          data: Math.pow(
            JSON.parse(sourceE[j][`C${1 + i}`].data)
              .map(e => e[0])
              .reduce((a, b) => a * b, 1),
            1 / JSON.parse(sourceE[j][`C${1 + i}`].data).length
          )
        };

        res["m"] = {
          id: i,
          data: Math.pow(
            JSON.parse(sourceE[j][`C${1 + i}`].data)
              .map(e => e[1])
              .reduce((a, b) => a * b, 1),
            1 / JSON.parse(sourceE[j][`C${1 + i}`].data).length
          )
        };

        res["u`"] = {
          id: i,
          data: Math.pow(
            JSON.parse(sourceE[j][`C${1 + i}`].data)
              .map(e => e[2])
              .reduce((a, b) => a * b, 1),
            1 / JSON.parse(sourceE[j][`C${1 + i}`].data).length
          )
        };

        res["u"] = {
          id: i,
          data: Math.max(
            ...JSON.parse(sourceE[j][`C${1 + i}`].data).map(e => e[2])
          )
        };

        dataSourceExp.push(res);
      }
    }

    this.matrixFNTransformedLinguisticTermsExpertsTable = {
      columns: ["none", "l", "l`", "m", "u`", "u"],
      dataSource: dataSourceExp
    };
  }

  setMatrixOptimalValuesCriteria() {
    this.matrixOptimalValueTable = null;
    const dataSource = [];
    const listCr = {};

    this.matrixFNTransformedLinguisticTermsExpertsTable.dataSource.forEach(
      el => {
        Object.keys(el).forEach(key => {
          if (key !== "none") {
            const keys = `${el["none"].data}`.split("_");
            if (!listCr[keys[1]]) {
              listCr[keys[1]] = {};
            }
            listCr[keys[1]][keys[0]] = el;
          }
        });
      }
    );

    Object.keys(listCr).forEach(key => {
      const res = {};
      res["none"] = {
        id: 0,
        start: true,
        data: key
      };

      res["l"] = {
        id: 0,
        data: Math.max(...Object.values(listCr[key]).map(e => e["l"].data))
      };

      res["l`"] = {
        id: 0,
        data: Math.max(...Object.values(listCr[key]).map(e => e["l`"].data))
      };

      res["m"] = {
        id: 0,
        data: Math.max(...Object.values(listCr[key]).map(e => e["m"].data))
      };

      res["u`"] = {
        id: 0,
        data: Math.max(...Object.values(listCr[key]).map(e => e["u`"].data))
      };

      res["u"] = {
        id: 0,
        data: Math.max(...Object.values(listCr[key]).map(e => e["u"].data))
      };

      dataSource.push(res);
    });

    this.matrixOptimalValueTable = {
      columns: ["none", "l", "l`", "m", "u`", "u"],
      dataSource
    };
  }

  setNotmalisedFuzzyMatrix() {
    this.notmalisedFuzzyMatrixTable = null;
    const dataSource = [];

    const exp = JSON.parse(
      JSON.stringify(
        this.matrixFNTransformedLinguisticTermsExpertsTable.dataSource
      )
    );
    const opt = JSON.parse(
      JSON.stringify(this.matrixOptimalValueTable.dataSource)
    );
    const col = opt.length;

    const criterias = {};
    exp.forEach(el => {
      const keys = `${el["none"].data}`.split("_");
      if (!criterias[keys[1]]) {
        criterias[keys[1]] = {};
        criterias[keys[1]]["Optimal"] = opt.find(
          e => e["none"].data === keys[1]
        );
      }
      criterias[keys[1]][keys[0]] = el;
    });

    Object.keys(criterias).forEach(key => {
      Object.keys(criterias[key]).forEach(sKye => {
        const k = key + "_" + sKye;
        const d = criterias[key][sKye];
        d["none"].data = k;
        Object.keys(d).forEach(k => {
          if (k !== "none") {
            d[k].data = d[k].data / col;
          }
        });
        dataSource.push(d);
      });
    });

    this.notmalisedFuzzyMatrixTable = {
      columns: ["none", "l", "l`", "m", "u`", "u"],
      dataSource
    };
  }

  setNormalizedWMatrix() {
    this.normalizedWMatrixTable = null;
    const norm = JSON.parse(
      JSON.stringify(this.notmalisedFuzzyMatrixTable.dataSource)
    );
    const criter = JSON.parse(
      JSON.stringify(
        this.matrixFNTransformedLinguisticTermsCriteriaTable.dataSource
      )
    );
    const dataSource = [];

    console.log(norm, criter);

    norm.forEach(el => {
      const keys = `${el["none"].data}`.split("_");
      const cr = criter.find(e => e["none"].data === keys[0]);

      Object.keys(el).forEach(k => {
        if (k !== "none") {
          el[k].data = el[k].data * cr[k].data;
        }
      });
      dataSource.push(el);
    });

    this.normalizedWMatrixTable = {
      columns: ["none", "l", "l`", "m", "u`", "u"],
      dataSource
    };
  }
}
