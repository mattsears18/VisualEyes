export default function renameRows(rawData) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.renameRows()');

  // assume this.fileFormat is already set
  if (!rawData || !rawData.length) {
    throw Error('noRawData');
  }

  const rows = [...rawData];

  if (!this.fileFormat) {
    throw new Error('noFileFormat');
  }

  let headers;

  if (this.fileFormat === 'smi') {
    headers = [
      { original: 'RecordingTime [ms]', new: 'timestamp' }, // TODO use video time!
      { original: 'Time of Day [h:m:s:ms]', new: 'timeOfDay' },
      { original: 'Category Binocular', new: 'category' },
      { original: 'Index Binocular', new: 'originalEventIndex' },
      { original: 'Point of Regard Binocular X [px]', new: 'x' },
      { original: 'Point of Regard Binocular Y [px]', new: 'y' },
      { original: 'Stimulus', new: 'stimulusName' },
      { original: 'AOI Name Binocular', new: 'aoiName' },
    ];
  } else if (this.fileFormat === 'imotions') {
    headers = [
      { original: 'Timestamp', new: 'timestamp' },
      { original: 'FixationSeq', new: 'originalEventIndex' },
      { original: 'GazeX', new: 'x' },
      { original: 'GazeY', new: 'y' },
      { original: 'FixationX', new: 'fixationX' },
      { original: 'FixationY', new: 'fixationY' },
      { original: 'FixationDuration', new: 'fixationDuration' },
      { original: 'StimulusName', new: 'stimulusName' },
      { original: 'GazeAOI', new: 'aoiName' },
    ];
  } else {
    throw new Error('unrecognizedFileFormat');
  }

  const renamedRows = [];
  const numberHeaders = [
    'timestamp',
    'originalEventIndex',
    'x',
    'y',
    'fixationX',
    'fixationY',
    'fixationDuration',
  ];

  for (let i = 0; i < rows.length; i += 1) {
    const renamedRow = {};
    headers.forEach((header) => {
      if ({}.hasOwnProperty.call(rows[i], header.original)) {
        if (numberHeaders.includes(header.new)) {
          renamedRow[header.new] = Math.round(rows[i][header.original]);
        } else {
          renamedRow[header.new] = rows[i][header.original];
        }
      }
    });

    renamedRows.push(renamedRow);
  }

  return renamedRows;
}
