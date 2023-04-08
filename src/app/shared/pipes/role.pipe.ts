import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return (value === 'A') ? 'Administrator' : 'Consumer';
    }

    return 'Consumer';
  }

}
