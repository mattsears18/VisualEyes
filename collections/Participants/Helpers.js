Participants.helpers({
  hasPermission(action) {
    check(action, String);
    return true;
  },
  variables() {
    variables = Variables.find({ studyId: this.studyId }).fetch();
    participant = this;

    if (participant.variableVals) {
      variables.forEach(function(variable) {
        const index = participant.variableVals.findIndex(function(variableVal) {
          return variableVal.variableId == variable._id;
        });
        if (index > -1) {
          if (participant.variableVals[index].value) {
            variable.value = participant.variableVals[index].value;
          }
        }
      });
    }
    return variables;
  },
});
