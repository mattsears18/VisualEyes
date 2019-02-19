Template.Stimulus.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var stimulusId = FlowRouter.getParam('stimulusId');
    self.subscribe('stimuli.single', stimulusId);
    self.subscribe('stimulusfiles.byStimulusId', stimulusId);
  });
});

Template.Stimulus.helpers({
  stimulus: () => {
    return Stimuli.findOne();
  },
  stimulusfile: () => {
    return Stimulusfiles.collection.findOne({});
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.BreadCrumbs.helpers({
  stimulus: () => {
    return Stimuli.findOne();
  },
});

Template.Stimulus.events({
  'click .update-stimulus': function() {
    Session.set('updateStimulus', true);
  }
});

Template.Stimulus.destroyed = function(){
  Session.set('updateStimulus', false);
}