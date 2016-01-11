import { Filter, Errors } from 'denali';
import { singularize } from 'inflection';

export default Filter.extend({

  name: 'normalize-thinky-errors',

  before() {
    if (this.error.message && this.error.message.match(/The query did not find a document/)) {
      let table = this.error.message.match(/returned null in:\s+r\.table\("(\w+)"\)/)[1];
      let message = singularize(table.toLowerCase()) + ' not found.';
      this.error = new Errors.NotFound(message);
    }
  }
});
