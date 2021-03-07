import { Component } from "@angular/core";

import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";

import { DataService } from "../../data.service";

@Component({
  selector: "my-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent {
  public lineChartData1: ChartDataSets[] = [];
  public lineChartLabels1: Label[] = [];
  public lineChartOptions1: ChartOptions & { annotation: any } = {
    responsive: true
  };
  public lineChartColors1: Color[] = [];
  public lineChartLegend1 = true;
  public lineChartType1 = "line";
  public lineChartPlugins1 = [];

  public lineChartData2: ChartDataSets[] = [];
  public lineChartLabels2: Label[] = [];
  public lineChartOptions2: ChartOptions & { annotation: any } = {
    responsive: true
  };
  public lineChartColors2: Color[] = [];
  public lineChartLegend2 = true;
  public lineChartType2 = "line";
  public lineChartPlugins2 = [];

  constructor(public dataService: DataService) {
    // const form = this.dataService.linguisticTermsForm.controls;
    // const data = [];
    // const labels = [];
    // form.forEach(e => {
    //   labels.push(`${e.value.range.low}`);
    //   labels.push(`${e.value.range.medium}`);
    //   labels.push(`${e.value.range.height}`);
    //   data.push({
    //     data: [
    //       {
    //         y: 0,
    //         x: `${e.value.range.low}`
    //       },
    //       {
    //         y: 100,
    //         x: `${e.value.range.medium}`
    //       },
    //       {
    //         y: 0,
    //         x: `${e.value.range.height}`
    //       }
    //     ],
    //     lineTension: 0,
    //     label: e.value.shortName
    //   });
    // });
    // labels.sort((a, b) => (+a > +b ? 1 : -1));
    // this.lineChartLabels1 = Array.from(new Set(labels));
    // this.lineChartData1 = data;
    // const norm = this.dataService.getNormLinguisticTerms();
    // const data1 = [];
    // const labels1 = [];
    // norm.forEach((e, inx) => {
    //   const subData = [];
    //   e.forEach((el, index) => {
    //     labels1.push(`${(+el).toFixed(2)}`);
    //     subData.push({
    //       y: index === 1 ? 1 : 0,
    //       x: `${(+el).toFixed(2)}`
    //     });
    //   });
    //   data1.push({
    //     data: subData,
    //     lineTension: 0,
    //     label: form[inx].value.shortName
    //   });
    // });
    // labels1.sort((a, b) => (+a > +b ? 1 : -1));
    // this.lineChartLabels2 = Array.from(new Set(labels1));
    // this.lineChartData2 = data1;
  }
}
