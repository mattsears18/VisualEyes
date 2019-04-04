import Stimuli from '../Stimuli';
var sizeOf = require('image-size');

Stimulusfiles.collection.before.insert(function(userId, doc) {
  var dims = sizeOf(doc.path);
  doc.fileWidth = dims.width;
  doc.fileHeight = dims.height;

  if(doc.meta && doc.meta.stimulusId) {
    Stimuli.update({ _id: doc.meta.stimulusId }, { $set: {
      stimulusfileId: doc._id,
      width: dims.width,
      height: dims.height,
    }});
  }
});

Stimulusfiles.collection.after.remove(function(userId, doc) {
  Stimuli.update({ stimulusfileId: doc._id }, { $unset: { stimulusfileId: true }});

  if(Meteor.isServer) {
    Meteor.call('stimulusfiles.removeOrphans');
  }
});
