import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'at-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="at-badge at-badge--{{atType}}">
      <span #content>
        <ng-content></ng-content>
      </span>
      <span class="at-badge" [ngClass]="{'at-badge--corner':(content.innerText.length > 0 || content.children.length >0),
        'at-badge--alone':(content.innerText.length == 0 && content.children.length == 0 )}" >
        <sup *ngIf="show" class="at-badge__content" [ngClass]="{'at-badge--dot':dot}">{{dot ? '' : atValue}}</sup>
      </span>
    </span>
  `
})
export class BadgeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  private _atValue: number | string;

  @Input() atType: 'info' | 'warning' | 'error' | 'success' = 'info';
  @Input() max;
  @Input() dot: boolean = false;
  @Input() show: boolean = true;

  get atValue(): number | string {
    if (this.max && this._atValue > this.max) {
      return this.max + '+';
    }
    return this._atValue;
  }

  @Input()
  set atValue(value: number | string) {
    this._atValue = value;
    this.show = typeof value === 'number' ? value >= 0 : true;
  }

}
