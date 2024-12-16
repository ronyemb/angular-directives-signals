import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  standalone: false
})
export class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;


  @Input() set color (value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors (value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    // console.log(el);
    this.htmlElement = el;
    // this.htmlElement.nativeElement.innerHTML = '';
  }

  ngOnInit(): void {
    //console.log('Directiva OnInit');
    this.setStyle();
  }

  setStyle(): void {
    if( !this.htmlElement ) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if( !this.htmlElement ) return;
    if( !this._errors ) {
      this.htmlElement!.nativeElement.innerHTML = '';
      return;
    }
    const errors = Object.keys(this._errors);
    console.log(`errors: ${errors}`);
    console.log(`this._errors: ${JSON.stringify(this._errors)}`);

    if( errors.includes('required') ) {
      this.htmlElement!.nativeElement.innerHTML = 'El campo es requerido';
      return;
    }
    if( errors.includes('minlength') ) {
      const min = this._errors!['minlength'].requiredLength;
      const current = this._errors!['minlength'].actualLength;
      this.htmlElement!.nativeElement.innerHTML = `El campo debe tener al menos ${min} caracteres, actualmente tiene ${current}`;
      return;
    }
    if( errors.includes('email') ) {
      this.htmlElement!.nativeElement.innerHTML = 'El campo debe ser un email';
      return;
    }
  }

}
