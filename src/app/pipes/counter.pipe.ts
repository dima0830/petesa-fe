import { Pipe, PipeTransform } from '@angular/core';
import { Counter } from '../components/misc/counter';

const counters = new WeakMap<any, Counter>();

@Pipe({
  name: 'counterPipe'
})
export class CounterPipe implements PipeTransform  {
  transform(value: any): Counter {
    if (!counters.has(value)) {
      counters.set(value, new Counter());
    }
    return counters.get(value);
  }
}