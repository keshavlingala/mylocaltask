import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[ngAutoFocus]',
  standalone: true
})
export class AutofocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) {
  };

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }


}
