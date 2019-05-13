Aois.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Aois.after.remove(function(userId, aoi) {
  if (Meteor.isServer) {
    Gazepoints.remove({ aoiId: aoi._id });
    Viewings.update(
      { studyId: aoi.studyId },
      { $pull: { aoiIds: aoi._id } },
      { multi: true },
    );
  }
});
