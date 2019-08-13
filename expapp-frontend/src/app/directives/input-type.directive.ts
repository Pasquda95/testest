import { Directive, ElementRef, HostListener, Input } from '@angular/core';

const MAX_NUMBER_LENGTH = 15;

@Directive({
  selector: '[appInputType]'
})
export class InputTypeDirective {

  @Input('appInputType') valitationType: string;
  private keyRegExp: RegExp;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', [ '$event' ])
  onkeydown(event: KeyboardEvent) {
    const currentValue: string = this.el.nativeElement.value;
    const newValue: string = currentValue.concat(event.key);
    switch(this.valitationType) {
      case 'phone': {
        const allowedKeys: Array<string> = ['End', 'Home', 'Tab', 'Backspace'];
        this.keyRegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

        if ( -1 !== allowedKeys.indexOf(event.key)) {
          return;
        }

        if ((!String(newValue).match(this.keyRegExp) && newValue) || newValue.length > MAX_NUMBER_LENGTH) {
          event.preventDefault();
        }
        break;
      }
      case 'name': {
        this.keyRegExp = new RegExp(/^[a-zA-Z]+(\.[a-zA-Z]*){0,1}$/g);

        if ((!String(newValue).match(this.keyRegExp) && newValue)) {
          event.preventDefault();
        }
        break;
      }
    }
  }

}
