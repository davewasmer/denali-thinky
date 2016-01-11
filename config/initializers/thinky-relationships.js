import { Initializer, inject } from 'denali';
import forEach from 'lodash/collection/forEach';

export default Initializer.extend({
  models: inject('model:*'),
  initialize() {
    forEach(this.models, (model, modulepath) => {
      if (!/mixins/.test(modulepath)) {
        model.addRelationships();
      }
    });
  }
});
