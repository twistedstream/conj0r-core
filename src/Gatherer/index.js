import _ from 'lodash';

export default class Gatherer {
  constructor(options, factories = {}) {
    if (!options) {
      throw new Error("Where's thy options?");
    }

    /* eslint-disable no-param-reassign */
    factories.gatheringStrategies = factories.gatheringStrategies ||
      (() => ({
        // TODO: load from files in strategies subdirectory when they're implemented
        apiv1: {},
        apiv2: {},
        authn: {}
      }));
    /* eslint-enable no-param-reassign */

    this.options = options;
    this.factories = factories;
  }

  gather(enlightenment) {
    if (!enlightenment) {
      throw new Error("Where's thy enlightenment?");
    }

    // initialize gatherings
    const gatherings = {
      apis: {},
      bag: {}
    };

    // group spell strategies by gathering strategy
    const spellStrategiesByGatheringStrategy =
      _.groupBy(enlightenment.strategies, 'gatheringStrategy');

    // get registered gathering strategies
    const gatheringStrategies = this.factories.gatheringStrategies(this.options);

    // perform gathering by gathering strategy
    const gatheredPromises = Object.keys(spellStrategiesByGatheringStrategy)
      .map((name) => {
        const gatheringStrategy = gatheringStrategies[name];
        const spellStrategies = spellStrategiesByGatheringStrategy[name];
        return gatheringStrategy.gather(spellStrategies, gatherings);
      });

    return Promise.all(gatheredPromises)
      .then(() => gatherings);
  }
}
