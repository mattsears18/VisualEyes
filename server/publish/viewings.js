////////////////////////////////////////////////////////////////////////////////
// Viewings Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('viewings.all', function() {
  return Viewings.find({});
});

Meteor.publish('viewings.single', function(id) {
  check(id, String);
  return Viewings.find({_id: id});
});

Meteor.publish('viewings.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Viewings.find({ analysisId: analysisId });
});