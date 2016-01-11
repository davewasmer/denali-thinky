import { Factory, inject } from 'denali';
import forOwn from 'lodash/object/forOwn';
import isArray from 'lodash/lang/isArray';

export default Factory.extend({
  thinky: inject('service:db'),
  singleton: false,
  instantiate: false,
  build() {
    let modelName = this.container.metaFor(this).name.moduleName;
    let attributes = this.attributes(this.thinky.type, this.thinky.r);
    let Model = this.thinky.createModel(modelName, attributes);
    this.indexes.forEach((indexArgs) => {
      if (!isArray(indexArgs)) {
        indexArgs = [ indexArgs ];
      }
      Model.ensureIndex(...indexArgs);
    });
    Model.defineStatic('addRelationships', () => {
      forOwn(this.relationships, (relationshipArgs, relationshipName) => {
        let relationshipType = relationshipArgs.shift();
        let relatedModel = this.container.lookup('model:' + relationshipArgs.shift());
        Model[relationshipType](relatedModel, relationshipName, ...relationshipArgs);
      });
    });
    forOwn(this.constructor.prototype, (value, key) => {
      if (typeof value === 'function') {
        Model.define(key, value);
      }
    });
    return Model;
  }
});
