Template.NewAnalysis.events({
  'click .fa-close': function() {
    Session.set('newAnalysis', false);
  }
});

AutoForm.hooks({
  insertAnalysisForm: {
    onSuccess: function(formType, result) {
      studyId = FlowRouter.getParam('studyId');
      FlowRouter.go('/studies/' + studyId + '/analyses/' + result);
    },
    onError: function(formType, error) {
      console.log(error);
    },
  }
});

Template.NewAnalysis.helpers({
  aoiOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    aois = Aois.find({ studyId: studyId }).fetch();
    return aois.map(function(aoi) {
      return { label: aoi.name, value: aoi._id, checked: 'checked' };
    });
  },
  datafileOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    datafiles = Datafiles.find({ studyId: studyId }).fetch();
    return datafiles.map(function(datafile) {
      return { label: datafile.name, value: datafile._id, checked: 'checked' };
    });
  }
});
