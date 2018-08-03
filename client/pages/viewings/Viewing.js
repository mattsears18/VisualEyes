Template.Viewing.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var viewingId = FlowRouter.getParam('viewingId');

    self.subscribe('viewings.single', viewingId);
    self.subscribe('files.datafiles.byViewingId', viewingId);
    self.subscribe('aois.byViewingId', viewingId);
    self.subscribe('analyses.byViewingId', viewingId);
  });
});

Template.Viewing.helpers({
  viewing: () => {
    return Viewings.findOne();
  },
  datafile: () => {
    return Datafiles.findOne();
  },
  selector: () => {
    var viewingId = FlowRouter.getParam('viewingId');
    viewing = Viewings.findOne(viewingId);
    if(viewing) {
      return { _id: { $in: viewing.recordingIds }};
    }
  },
});

Template.BreadCrumbs.helpers({
  study: () => {
    return Studies.findOne();
  },
  viewing: () => {
    return Viewings.findOne();
  }
});

Template.Viewing.events({
  'click .update-viewing': function() {
    Session.set('updateViewing', true);
  }
});

Template.Viewing.destroyed = function(){
  Session.set('updateViewing', false);
}