import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Analyses = new Mongo.Collection('analyses');

Analyses.allow({
  insert: function(userId, doc) {
    return true;
    if(!Roles.userIsInRole(userId, 'create', 'analyses')) {
      throw new Meteor.Error('analyses.create.unauthorized',
        'You do not have permission to create analyses.');
    } else {
      return true;
    }
  },
  update: function(userId, doc) {
    return true;
    analysis = Analyses.findOne({_id: doc._id});
    return analysis.hasPermission('update');
  },
  remove: function(userId, doc) {
    return true;
    analysis = Analyses.findOne({_id: doc._id});
    return analysis.hasPermission('destroy');
  },
});

Schemas.Analysis = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  },
  desc: {
    type: String,
    label: 'Description',
    autoform: {
      rows: 8
    },
    optional: true,
  },
}, {tracker: Tracker});

Analyses.attachSchema(Schemas.Analysis);

export default Analyses;
