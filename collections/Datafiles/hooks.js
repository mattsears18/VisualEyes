import Jobs from '../Jobs/Jobs';
import Eyeevents from '../Eyeevents/Eyeevents';
import Gazepoints from '../Gazepoints/Gazepoints';

Datafiles.collection.before.insert(function(userId, doc) {
  if (doc.meta && doc.meta.studyId) {
    doc.studyId = doc.meta.studyId;
  }
});

Datafiles.collection.after.insert(function(userId, doc) {
  if (Meteor.isServer) {
    const datafile = Datafiles.collection.findOne({ _id: doc._id });
    datafile.makeProcessJob();
  }
});

Datafiles.collection.after.remove(function(userId, datafile) {
  // Update Stimuli.datafileIds
  Stimuli.update(
    { studyId: datafile.studyId, datafileIds: datafile._id },
    { $pull: { datafileIds: datafile._id } },
    { multi: true },
  );

  // Update Aoi.datafileIds
  Aois.update(
    { studyId: datafile.studyId, datafileIds: datafile._id },
    { $pull: { datafileIds: datafile._id } },
    { multi: true },
  );

  // Update Participant.datafileIds
  Participants.update(
    { studyId: datafile.studyId, datafileIds: datafile._id },
    { $pull: { datafileIds: datafile._id } },
    { multi: true },
  );

  if (Meteor.isServer) {
    // Delete any Participants that no longer have datafileIds
    Participants.remove({ datafileIds: { $eq: [] } });

    Jobs.remove({ data: { datafileId: datafile._id } });

    Gazepoints.remove({ datafileId: datafile._id });

    Eyeevents.remove({ datafileId: datafile._id });
  }
});
