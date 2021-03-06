export default function setFileFormat(rawData) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.setFileFormat()');

  if (!this.isText) {
    this.status = 'unrecognizedFileFormat';
    Datafiles.update(
      { _id: this._id },
      { $set: { status: 'unrecognizedFileFormat' } },
    );
  } else if (!this.fileFormat) {
    this.fileFormat = this.detectFileFormat(rawData);
    Datafiles.update(
      { _id: this._id },
      { $set: { fileFormat: this.fileFormat } },
    );
  }

  if (Meteor.isServer && !Meteor.isTest) console.log(`file format: ${this.fileFormat}`);

  return this.fileFormat;
}
