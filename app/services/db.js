import { Factory, inject } from 'denali';
import Thinky from 'thinky';

export default Factory.extend({
  config: inject('config:environment'),
  singleton: false,
  instantiate: false,
  build() {
    return Thinky(this.config.database);
  }
});
