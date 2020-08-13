import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import {
  Line,
  DataItem,
  LineConfig,
  StackedArea,
  StackedAreaConfig,
  GroupedBarConfig,
  GroupedBar,
  WordCloud,
  WordCloudConfig,
  registerTheme,
  Radar,
  RadarConfig
} from '@antv/g2plot';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subject } from 'rxjs';
import { ConfigService } from 'src/services/config.service';
import { takeUntil, map } from 'rxjs/operators';

/**
 * 仪表盘
 *
 * @export
 * @class DashboardComponent
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  @ViewChild('line') line: ElementRef;
  lineGraph: Line;
  lineData: DataItem[] = [];
  lineConfig: LineConfig = {
    height: 300,
    title: {
      visible: true,
      text: '折线图',
      style: { fill: '#787879' }
    },
    forceFit: true,
    xField: 'date',
    yField: 'value',
    xAxis: {
      tickCount: 3
    },
    tooltip: {}
  };

  @ViewChild('area') area: ElementRef;
  areaGraph: StackedArea;
  areaData: DataItem[] = [];
  areaConfig: StackedAreaConfig = {
    height: 300,
    title: {
      visible: true,
      text: '堆叠面积图',
      style: { fill: '#787879' }
    },
    forceFit: true,
    xField: 'date',
    yField: 'value',
    stackField: 'country',
    color: ['#1976d2', '#67c23a', '#e6a23c', '#f56c6c', '#909399', 'yellow', 'pink'],
    xAxis: {
      tickCount: 5
    },
    legend: {
      visible: true,
      position: 'top-center'
    },
    responsive: true
  };

  @ViewChild('bar') bar: ElementRef;
  barGraph: GroupedBar;
  barData: DataItem[] = [];
  barConfig: GroupedBarConfig = {
    height: 350,
    title: {
      visible: true,
      text: '条形图',
      style: { fill: '#787879' }
    },
    forceFit: true,
    xField: 'value',
    yField: 'label',
    groupField: 'type',
    color: ['#1976d2', '#67c23a'],
    label: {
      formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      style: {
        strokeStyle: 'transparent'
      }
    }
  };

  @ViewChild('word') word: ElementRef;
  wordGraph: WordCloud;
  wordData: DataItem[] = [];
  wordConfig: WordCloudConfig = {
    height: 350,
    wordStyle: {
      rotation: [-Math.PI / 2, Math.PI / 2],
      rotateRatio: 0.5,
      rotationSteps: 4,
      fontSize: [10, 60],
      color: (word, weight) => {
        return this.getRandomColor();
      },
      gridSize: 8
    },
    tooltip: {
      visible: false,
      items: []
    },
    forceFit: true,
    data: [],
    shape: 'cardioid',
    shuffle: false,
    selected: -1
  };

  @ViewChild('radar') radar: ElementRef;
  radarGraph: Radar;
  radarData: DataItem[] = [];
  radarConfig: RadarConfig = {
    height: 350,
    title: {
      visible: true,
      text: '雷达图',
      style: { fill: '#787879' }
    },
    forceFit: true,
    angleField: 'item',
    radiusField: 'score',
    seriesField: 'user',
    radiusAxis: {
      grid: {
        line: {
          type: 'line'
        }
      }
    },
    line: {
      visible: true
    },
    point: {
      visible: true,
      shape: 'circle'
    },
    legend: {
      visible: true,
      position: 'bottom-center'
    }
  };

  darkTootip = {
    domStyles: { 'g2-tooltip': { 'background-color': '#272727', color: '#dddddd', 'box-shadow': '0 1px 8px 0 rgba(0, 0, 0, 0.8)' } }
  };

  lightTootip = {
    domStyles: { 'g2-tooltip': { 'background-color': 'white', color: '#333333', 'box-shadow': '0 1px 8px 0 rgba(0, 0, 0, 0.3)' } }
  };

  private _unSubject = new Subject<void>();

  constructor(private http: HttpClient, private config: ConfigService) {
    registerTheme('dark', {});
  }

  ngOnInit() {
    this.config.darkChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.updateLine(x);
      this.updateArea(x);
      this.updateBar(x);
      this.updateWord(x);
      this.updateRadar(x);
    });
  }

  ngAfterViewInit() {
    forkJoin(
      this.http.get('./assets/json/line.json'),
      this.http.get('./assets/json/area.json'),
      this.http.get('./assets/json/bar.json'),
      this.http.get('./assets/json/word.json').pipe(
        map((data: any) => {
          let list: any[] = [];
          data.forEach((d: any) => {
            list.push({
              word: d.name,
              weight: d.value,
              id: list.length
            });
          });
          return list;
        })
      ),
      this.http.get('./assets/json/radar.json')
    ).subscribe((datas: any[]) => {
      if (datas.length > 0) {
        this.lineConfig.data = datas[0];
        this.createLine(this.lineConfig);
        this.areaConfig.data = datas[1];
        this.createArea(this.areaConfig);
        this.barConfig.data = datas[2];
        this.createBar(this.barConfig);
        this.wordConfig.data = datas[3];
        this.createWord(this.wordConfig);
        this.radarConfig.data = datas[4];
        this.createRadar(this.radarConfig);
      }
    });
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  getRandomColor() {
    const arr = ['#1976d2', '#67c23a', '#e6a23c', '#f56c6c', '#909399'];
    return arr[Math.floor(Math.random() * (arr.length - 1))];
  }

  updateLine(dark: boolean) {
    if (dark) {
      this.lineConfig.tooltip = this.darkTootip;
    } else {
      this.lineConfig.tooltip = this.lightTootip;
    }
    if (this.lineGraph) {
      this.lineGraph.updateConfig(this.lineConfig);
      this.lineGraph.render();
    }
  }

  createLine(config: LineConfig) {
    if (this.lineGraph) {
      this.lineGraph.updateConfig(config);
    } else {
      this.lineGraph = new Line(this.line.nativeElement, config);
      this.lineGraph.render();
    }
  }

  updateArea(dark: boolean) {
    if (dark) {
      this.areaConfig.tooltip = this.darkTootip;
    } else {
      this.areaConfig.tooltip = this.lightTootip;
    }
    if (this.areaGraph) {
      this.areaGraph.updateConfig(this.areaConfig);
      this.areaGraph.render();
    }
  }

  createArea(config: StackedAreaConfig) {
    if (this.areaGraph) {
      this.areaGraph.updateConfig(config);
    } else {
      this.areaGraph = new StackedArea(this.area.nativeElement, config);
      this.areaGraph.render();
    }
  }

  updateBar(dark: boolean) {
    if (dark) {
      this.barConfig.tooltip = this.darkTootip;
    } else {
      this.barConfig.tooltip = this.lightTootip;
    }
    if (this.barGraph) {
      this.barGraph.updateConfig(this.barConfig);
      this.barGraph.render();
    }
  }

  createBar(config: GroupedBarConfig) {
    if (this.barGraph) {
      this.barGraph.updateConfig(config);
    } else {
      this.barGraph = new GroupedBar(this.bar.nativeElement, config);
      this.barGraph.render();
    }
  }

  updateWord(dark: boolean) {
    if (dark) {
    } else {
    }
    if (this.wordGraph) {
      this.wordGraph.updateConfig(this.wordConfig);
      this.wordGraph.render();
    }
  }

  createWord(config: WordCloudConfig) {
    if (this.wordGraph) {
      this.wordGraph.updateConfig(config);
    } else {
      this.wordGraph = new WordCloud(this.word.nativeElement, config);
      this.wordGraph.render();
    }
  }

  updateRadar(dark: boolean) {
    if (dark) {
      this.radarConfig.tooltip = this.darkTootip;
    } else {
      this.radarConfig.tooltip = this.lightTootip;
    }
    if (this.radarGraph) {
      this.radarGraph.updateConfig(this.radarConfig);
      this.radarGraph.render();
    }
  }

  createRadar(config: RadarConfig) {
    if (this.radarGraph) {
      this.radarGraph.updateConfig(config);
    } else {
      this.radarGraph = new Radar(this.radar.nativeElement, config);
      this.radarGraph.render();
    }
  }
}
