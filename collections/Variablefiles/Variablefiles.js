import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// SimpleSchema.extendOptions(['autoform']);

Schemas.Variablefile = Object.assign({}, FilesCollection.schema, {
  studyId: {
    type: String,
    optional: true,
  },
  status: {
    type: String,
    optional: true,
  },
});

options = {
  collectionName: 'Variablefiles',
  schema: Schemas.Variablefile,
  allowClientCode: true, // Required to let you remove uploaded file
  onAfterUpload(variablefile) {
    if (Meteor.isServer) {
      const vf = Variablefiles.collection.findOne({ _id: variablefile._id });
      vf.process();
    }
  },
};

path = Meteor.settings.public.uploads;
if (path) {
  options.storagePath = `${path}/stimulusfiles`;
}

Variablefiles = new FilesCollection(options);

Variablefiles.collection.attachSchema(new SimpleSchema(Schemas.Variablefile));

require('./hooks');

export default Variablefiles;
