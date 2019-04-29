import FileSaver from 'file-saver';

export default function saveCSVParticipants() {
  var csvContent = this.getCSVParticipants();

  if(Meteor.isServer) {
    // Save file on the server with default filename for analysis in R
    fs.writeFile(process.env['PWD'] + '/lastAnalysisParticipants.csv', csvContent, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }

  if(Meteor.isClient) {
    // Set default file name for organizing later
    let nameFile = this.study().name + ' - p' + this.period + 'vg' + this.viewingGap + 'mvt' + this.minViewingTime + ' - Participants';
    var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
    // Save file to user's disk
    FileSaver.saveAs(blob, nameFile);
  }
}