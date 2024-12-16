import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  standalone: false,

  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'j3G0s@example.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed( () => `${this.user().first_name} ${this.user().last_name}` )

  public userChangeEffect = effect( () => {
    console.log( `${this.user().first_name} - ${this.counter() }` )
  } );

 public onFieldUpdated( field: keyof User, value: string ): void {
  this.user.update( current => ({
    ...current,
    [field]: value,
  }) );
 }

 public increaseBy( value: number ): void {
  this.counter.update( current => current + value );
 }

}
