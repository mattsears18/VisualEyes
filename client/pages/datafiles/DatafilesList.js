Template.DatafilesList.helpers({
  study: () => Studies.findOne(),
  datafiles: () => Datafiles.find({}, { sort: { name: 1 } }),
});

Template.DatafilesList.events({
  'click .reprocess-datafiles'() {
    Meteor.call('studies.reprocessDatafiles', { studyId: study._id });
  },
  'click .upload-datafiles'() {
    Session.set('uploadingDatafiles', true);
    $('#datafileInput').click();
  },
  'click .delete-datafile'(e, template) {
    if (confirm(`Really delete "${e.target.dataset.datafilename}"?`)) {
      Datafiles.remove({ _id: e.target.dataset.datafileid });
    }
  },
});

Template.DatafilesList.destroyed = function() {
  Session.set('uploadingDatafiles', false);
};
