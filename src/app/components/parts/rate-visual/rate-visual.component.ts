import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-visual',
  templateUrl: './rate-visual.component.html',
  styleUrl: './rate-visual.component.scss'
})
export class RateVisualComponent{
  @Input() rateCout: number = 0;
  @Input() allRatesCount: number | undefined = 0;

  calculateWidthPercentage(rateCout: number, allRatesCount: number | undefined){
    if(allRatesCount !== undefined){
      return 100 * rateCout / allRatesCount;
    }
    return 0;
  }
}
