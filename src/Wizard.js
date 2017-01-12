import EventEmitter from 'events';

// these will be imported when they are implemented
class SpellBook { }
class Gatherer { }
class Realizer { }

export default class Wizard extends EventEmitter {
  constructor(options, factories = {}) {
    if (!options) {
      throw new Error("Where's thy options?");
    }

    // configure default dependencies
    /* eslint-disable no-param-reassign */
    factories.spellBook = factories.spellBook ||
      (() => new SpellBook());
    factories.gatherer = factories.gatherer ||
      (() => new Gatherer());
    factories.realizer = factories.realizer ||
      (() => new Realizer());
    /* eslint-enable no-param-reassign */

    super();

    this.options = options;
    this.factories = factories;
  }

  cast(spell) {
    if (!spell) {
      throw new Error("Where's thy spell?");
    }

    let enlightenment;
    try {
      enlightenment = spell.cast(this.factories.spellBook());
    } catch (err) {
      this.emit('error', err);
    }

    if (enlightenment) {
      this.emit('enlightened', enlightenment);

      const gatherer = this.factories.gatherer(enlightenment);
      gatherer.gather(enlightenment)
        .then((gatherings) => {
          this.emit('gathered', gatherings);

          const realizer = this.factories.realizer(gatherings);
          return realizer.realize(enlightenment, gatherings);
        })
        .then((realization) => {
          this.emit('realized', realization);
        })
        .catch(err => this.emit('error', err));
    }
  }
}
