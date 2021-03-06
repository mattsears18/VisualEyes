Template.AnalysesList.onCreated(function() {
  const self = this;

  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
  });
});

Template.AnalysesList.helpers({
  study: () => Studies.findOne(),
  analyses: () => Analyses.find(),
});

Template.AnalysesList.events({
  'click .new-analysis'() {
    Session.set('newAnalysis', true);
  },
  'click .reprocess-analyses'() {
    Meteor.call('studies.reprocessAnalyses', {
      studyId: FlowRouter.getParam('studyId'),
    });
  },
  'click .export-summary'() {
    const study = Studies.findOne();
    study.saveCSV({
      type: 'summary',
      groupBy: 'analysis',
    });
  },
  'click .delete-analysis'(e, template) {
    if (confirm(`Really delete "${e.target.dataset.analysisName}"?`)) {
      Analyses.remove({ _id: e.target.dataset.analysisId });
    }
  },
  'click .make-default-analyses'(e, template) {
    const study = Studies.findOne();
    Meteor.call('studies.makeDefaultAnalyses', { studyId: study._id });
  },
});

Template.AnalysesList.destroyed = function() {
  Session.set('newAnalysis', false);
};
