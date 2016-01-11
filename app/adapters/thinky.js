import assert from 'assert';
import { Adapter } from 'denali';

export default Adapter.extend({

  typeForRecord(record) {
    assert(typeof record.getModel === 'function', 'You attempted to render something other than a Thinky model.');
    return record.getModel().getTableName().toLowerCase();
  },

  idForRecord(record) {
    return record.id;
  },

  attributeFromRecord(record, attributeName) {
    return record[attributeName];
  },

  relationshipFromRecord(record, name, config) {
    if (config.strategy === 'id') {
      return record[name + 'Id'];
    } else if (config.strategy === 'ids') {
      return record[name + 'Ids'];
    } else if (config.strategy === 'record' || config.strategy === 'records') {
      if ((record[name + 'Id'] || record[name + 'Ids']) && !record[name]) {
        throw new Error(`${ name } relationship record(s) missing! Did you forget to .getJoin()?`);
      }
      return record[name];
    }
  }

});
