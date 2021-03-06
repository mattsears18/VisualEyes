import Studies from '../../../collections/Studies/Studies';

Meteor.methods({
  'studies.reprocessAnalyses'({ studyId }) {
    console.log('Meteor Method: studies.reprocessAnalyses()');
    // this method is only necessary to allow a user to manually
    // reprocess the analyses (from the client)
    check(studyId, String);
    const study = Studies.findOne({ _id: studyId });
    if (study) study.reprocessAnalyses();
  },
});
