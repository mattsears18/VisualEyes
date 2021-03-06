import Analyses from '../../../collections/Analyses/Analyses';

Meteor.methods({
  'analyses.makeVisitJobsJob'({ analysisId }) {
    if (Meteor.isServer) console.log('Meteor Method: analyses.makeVisitJobsJob()');
    // this method is only necessary to allow a user to manually
    // reprocess a single analysis (from the client)
    check(analysisId, String);
    const analysis = Analyses.findOne(analysisId);
    if (analysis) analysis.makeVisitJobsJob();
  },
});
