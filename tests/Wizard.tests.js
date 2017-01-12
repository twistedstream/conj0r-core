import test from 'tape';
import { Wizard } from '../src';

test('Wizard.constructor should require options', (t) => {
  t.plan(1);

  t.throws(() => new Wizard(), /Where's thy options\?/);
});

test('Wizard.constructor should set options', (t) => {
  t.plan(1);

  const options = {};
  const wizard = new Wizard(options);

  t.equal(options, wizard.options);
});

test('Wizard.constructor should allow dependency injection', (t) => {
  t.plan(1);

  const factories = {};
  const wizard = new Wizard({}, factories);

  t.equal(factories, wizard.factories);
});

test('Wizard.cast should require a spell', (t) => {
  t.plan(1);

  const wizard = new Wizard({});

  t.throws(() => wizard.cast(), /Where's thy spell\?/);
});

test('Wizard.cast should emit an error when enlightenment fails', (t) => {
  t.plan(1);

  const wizard = new Wizard({});

  wizard.on('error', err => t.equal(err.message, 'Poof!'));

  const spell = { cast: () => { throw new Error('Poof!'); } };
  wizard.cast(spell);
});

test('Wizard.cast should cast the spell, passing a spell book', (t) => {
  t.plan(1);

  const spellBook = {};

  const wizard = new Wizard({}, {
    spellBook: () => spellBook
  });

  const spell = { cast: s => t.equal(s, spellBook) };
  wizard.cast(spell);
});

test('Wizard.cast should emit an error when gathering fails', (t) => {
  t.plan(1);

  const wizard = new Wizard({}, {
    spellBook: () => ({}),
    gatherer: () => ({
      gather: () => Promise.reject(new Error('Poof!'))
    })
  });

  wizard.on('error', err => t.equal(err.message, 'Poof!'));

  const spell = { cast: () => ({}) };
  wizard.cast(spell);
});

test('Wizard.cast should call the gatherer, passing the enlightenment', (t) => {
  t.plan(1);

  const enlightenment = {};

  const wizard = new Wizard({}, {
    spellBook: () => ({}),
    gatherer: () => ({
      gather: (e) => {
        t.equal(e, enlightenment);

        return Promise.resolve();
      }
    })
  });

  const spell = { cast: () => enlightenment };
  wizard.cast(spell);
});

test('Wizard.cast should emit an error when realization fails', (t) => {
  t.plan(1);

  const wizard = new Wizard({}, {
    spellBook: () => ({}),
    gatherer: () => ({
      gather: () => Promise.resolve()
    }),
    realizer: () => ({
      realize: () => Promise.reject(new Error('Poof!'))
    })
  });

  wizard.on('error', err => t.equal(err.message, 'Poof!'));

  const spell = { cast: () => ({}) };
  wizard.cast(spell);
});

test('Wizard.cast should call the realizer, passing the enlightenment and gatherings', (t) => {
  t.plan(2);

  const enlightenment = {};
  const gatherings = {};

  const wizard = new Wizard({}, {
    spellBook: () => ({}),
    gatherer: () => ({
      gather: () => Promise.resolve(gatherings)
    }),
    realizer: () => ({
      realize: (e, g) => {
        t.equal(e, enlightenment);
        t.equal(g, gatherings);

        return Promise.resolve();
      }
    })
  });

  const spell = { cast: () => enlightenment };
  wizard.cast(spell);
});

test('Wizard.cast should emit the expected event data and sequence', (t) => {
  t.plan(4);

  const enlightenment = {};
  const gatherings = {};
  const realization = {};

  const wizard = new Wizard({}, {
    spellBook: () => ({}),
    gatherer: () => ({
      gather: () => Promise.resolve(gatherings)
    }),
    realizer: () => ({
      realize: () => Promise.resolve(realization)
    })
  });

  const events = [];
  wizard.on('enlightened', (e) => {
    t.equal(e, enlightenment);

    events.push('enlightened');
  });
  wizard.on('gathered', (g) => {
    t.equal(g, gatherings);

    events.push('gathered');
  });
  wizard.on('realized', (r) => {
    t.equal(r, realization);

    events.push('realized');
    t.same(events, ['enlightened', 'gathered', 'realized']);
  });

  const spell = { cast: () => enlightenment };
  wizard.cast(spell);
});
