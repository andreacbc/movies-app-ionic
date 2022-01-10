import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  transform( arr: any[] ): any[] {

    const pares = arr.reduce( (result, value, index, array) => {
      // console.log('arr', arr);
      // console.log('result', result);
      // console.log('index', index);
      // console.log('array', array);

      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    //console.log(pares);
    return pares;
 }

}
