Template.UpdateAoi.events({
  'click .fa-close': function() {
    Session.set('updateAoi', false);
  }
});

AutoForm.hooks({
  updateAoiForm: {
    onSuccess: function(formType, result) {
      Session.set('updateAoi', false);
    },
  }
});

Template.UpdateAoi.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/aois');
    }
  },
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
});