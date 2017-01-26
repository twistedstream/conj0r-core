import { Wizard } from '../dist';
import * as spell from './sampleSpell';

const wizard = new Wizard({
  // TODO: config
});

wizard.on('enlightened',
  enlightenment => console.log('ENLIGHTENED!', enlightenment));
wizard.on('gathered',
  gatherings => console.log('GATHERED!', gatherings));
wizard.on('realized',
  realization => console.log('REALIZED!', realization));
wizard.on('error',
  err => console.log('ERROR!', err));

console.log(`
*** Casting the spell!!! ***
`);
wizard.cast(spell);
