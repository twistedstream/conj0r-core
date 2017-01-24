import test from 'tape';
import { Gatherer } from '../src';

test('Gatherer.constructor should require options', (t) => {
  t.plan(1);

  t.throws(() => new Gatherer(), /Where's thy options\?/);
});

test('Gatherer.constructor should set options', (t) => {
  t.plan(1);

  const options = {};
  const gatherer = new Gatherer(options);

  t.equal(options, gatherer.options);
});

test('Gatherer.constructor should allow dependency injection', (t) => {
  t.plan(1);

  const factories = {};
  const gatherer = new Gatherer({}, factories);

  t.equal(factories, gatherer.factories);
});

test('Gatherer.gather should require enlightenment', (t) => {
  t.plan(1);

  const gatherer = new Gatherer({});

  t.throws(() => gatherer.gather(), /Where's thy enlightenment\?/);
});

test('Gatherer.gather should return a gathering strategy error', (t) => {
  t.plan(1);

  const gatherer = new Gatherer({}, {
    gatheringStrategies: () => ({
      strategy1: {
        gather: () => Promise.reject(new Error('Poof!'))
      }
    })
  });

  const enlightenment = {
    strategies: [{ gatheringStrategy: 'strategy1' }]
  };

  gatherer.gather(enlightenment)
    .catch(err => t.equal(err.message, 'Poof!'));
});

test('Gatherer.gather perform a gather on each gathering strategy, passing each its own spell strategies', (t) => {
  t.plan(2);

  const spellStrategiesThatUseStrategy1 = [
    { gatheringStrategy: 'strategy1' },
    { gatheringStrategy: 'strategy1' }
  ];
  let spellStrategiesPassedToStrategy1;

  const spellStrategiesThatUseStrategy2 = [
    { gatheringStrategy: 'strategy2' },
    { gatheringStrategy: 'strategy2' }
  ];
  let spellStrategiesPassedToStrategy2;

  const allSpellStrategies =
    spellStrategiesThatUseStrategy1.concat(spellStrategiesThatUseStrategy2);

  const gatherer = new Gatherer({}, {
    gatheringStrategies: () => ({
      strategy1: {
        gather: (spellStrategies) => {
          spellStrategiesPassedToStrategy1 = spellStrategies;

          return Promise.resolve();
        }
      },

      strategy2: {
        gather: (spellStrategies) => {
          spellStrategiesPassedToStrategy2 = spellStrategies;

          return Promise.resolve();
        }
      }
    })
  });

  const enlightenment = {
    strategies: allSpellStrategies
  };

  gatherer.gather(enlightenment)
    .then(() => {
      t.deepEqual(spellStrategiesThatUseStrategy1, spellStrategiesPassedToStrategy1);
      t.deepEqual(spellStrategiesThatUseStrategy2, spellStrategiesPassedToStrategy2);
    });
});
