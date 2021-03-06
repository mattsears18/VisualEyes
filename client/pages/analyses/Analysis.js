import { jStat } from 'jStat';
import Jobs from '../../../collections/Jobs/Jobs';
import helpers from '../../../lib/helpers';
import Eyeevents from '../../../collections/Eyeevents/Eyeevents';

let participantSub;
let stimuliSub;

Template.Analysis.onCreated(function() {
  const studyId = FlowRouter.getParam('studyId');
  const analysisId = FlowRouter.getParam('analysisId');
  const self = this;

  self.selector = new ReactiveDict();

  self.selector.set('participantIds', []);
  self.selector.set('stimulusIds', []);
  self.selector.set('selector', {});
  self.subscribe('eyeevents.byStudyId', studyId);
  self.subscribe('analyses.single', analysisId);

  // BAD!!!
  self.subscribe('visits.byAnalysisIdForExport', analysisId);

  self.subscribe('participants.byAnalysisId', analysisId);
  self.subscribe('stimuli.byAnalysisId', analysisId);

  self.autorun(function() {
    // self.subscribe('studies.single', studyId);
    self.subscribe('aois.byStudyId', studyId);
    // self.subscribe('variables.byStudyId', studyId);
    // self.subscribe('datafiles.byStudyId', studyId);
    const analysis = Analyses.findOne({
      _id: FlowRouter.getParam('analysisId'),
    });

    if (analysis && analysis.status === 'processing') {
      self.subscribe('jobs.byAnalysisId', analysisId);
    }
    if (self.subscriptionsReady()) {
      updateSelectors(self);
    }
  });
});

Template.BreadCrumbs.helpers({
  analysis: () => Analyses.findOne({ _id: FlowRouter.getParam('analysisId') }),
});

Template.Analysis.helpers({
  eyeevents: () => Eyeevents.find(),
  analysis: () => Analyses.findOne({ _id: FlowRouter.getParam('analysisId') }),
  visits: () => {
    template = Template.instance();
    participantIds = template.selector.get('participantIds');
    stimulusIds = template.selector.get('stimulusIds');

    selector = {
      analysisId: FlowRouter.getParam('analysisId'),
      participantId: { $in: participantIds },
      stimulusId: { $in: stimulusIds },
    };

    template.selector.set('selector', selector);

    return Visits.find(selector);
  },
  study: () => Studies.findOne(),
  stimuli: () => Stimuli.find(),
  participants: () => Participants.find(),
  showParticipantIds() {
    return Template.instance().selector.get('participantIds');
  },
  showStimulusIds() {
    return Template.instance().selector.get('stimulusIds');
  },
  selector() {
    return Template.instance().selector.get('selector');
  },
});

Template.Analysis.events({
  'click .export-visits-summary'(e, template) {
    const analysis = Analyses.findOne({
      _id: FlowRouter.getParam('analysisId'),
    });

    analysis.saveCSV({ type: 'summary', groupBy: 'visit' });
  },
  'click .export-participants-summary'(e, template) {
    const analysis = Analyses.findOne({
      _id: FlowRouter.getParam('analysisId'),
    });
    analysis.saveCSV({ type: 'summary', groupBy: 'participant' });
  },
  'click .reprocess-analysis'() {
    Meteor.call('analyses.makeVisitJobsJob', {
      analysisId: FlowRouter.getParam('analysisId'),
    });
  },
  'click .update-analysis'() {
    Session.set('updateAnalysis', true);
  },
  'click .selector'(e, template) {
    $target = $(e.target);
    $target.toggleClass('label-primary');
    $target.toggleClass('label-default');

    updateSelectors(template);
  },
  'click .toggle-all'(e, template) {
    $toggle = $(e.target);
    $toggle.toggleClass('label-primary');
    $toggle.toggleClass('label-default');

    $selectors = $toggle.closest('.selector-set').find('.selector');

    if ($toggle.hasClass('label-primary')) {
      $selectors.addClass('label-default');
      $selectors.removeClass('label-primary');
    } else if ($toggle.hasClass('label-default')) {
      $selectors.addClass('label-primary');
      $selectors.removeClass('label-default');
    }

    updateSelectors(template);
  },
});

Template.Analysis.destroyed = function() {
  Session.set('updateAnalysis', false);
};

function getVisitsJobsProgress() {
  progress = 0;

  jobsCount = Jobs.find().count();
  jobsCompletedCount = Jobs.find({ status: 'completed' }).count();

  if (jobsCount && jobsCompletedCount) {
    progress = helpers.formatNumber((jobsCompletedCount / jobsCount) * 100);
  }

  return progress;
}

function updateSelectors(template) {
  $participants = $('.selector.participant.label-primary');
  participantIds = $participants
    .map(function() {
      return $(this).data('id');
    })
    .toArray();

  template.selector.set('participantIds', participantIds);

  $stimuli = $('.selector.stimulus.label-primary');
  stimulusIds = $stimuli
    .map(function() {
      return $(this).data('id');
    })
    .toArray();

  template.selector.set('stimulusIds', stimulusIds);
}
