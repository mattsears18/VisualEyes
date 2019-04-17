import FileSaver from 'file-saver';

export default function saveCSV() {
  console.log('saveCSV');
  let csvContent = this.getCSV();
  if(Meteor.isServer) {
    // Save file on the server with default filename for analysis in R
    fs.writeFile(process.env['PWD'] + '/lastPlotHullSeries.csv', csvContent, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }

  if(Meteor.isClient) {
    // Set default file name for organizing later
    // let nameFile = 'p' + analysis.period + 'vg' + analysis.viewingGap + 'mvt' + analysis.minViewingTime + ' - ' + analysis.name;
    let nameFile = 'hulls ' + this.viewing()._id;
    var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
    // Save file to user's disk
    FileSaver.saveAs(blob, nameFile);
  }
}
