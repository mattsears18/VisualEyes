import assignAois from './imports/assignAois';
import assignStimuli from './imports/assignStimuli';
import detectFileFormat from './imports/detectFileFormat';
import filterSortFloat from './imports/filterSortFloat';
import generateImotionsEyeevents from './imports/generateImotionsEyeevents';
import generateSMIEyeevents from './imports/generateSMIEyeevents';
import getAssignedRows from './imports/getAssignedRows';
import getName from './imports/getName';
import getValidCoordinatesOnly from './imports/getValidCoordinatesOnly';
import getRawData from './imports/getRawData';
import renameRows from './imports/renameRows';
import getStimuliOnly from './imports/getStimuliOnly';
import groupRowsByAoi from './imports/groupRowsByAoi';
import groupRowsByStimulus from './imports/groupRowsByStimulus';
import makeEyeevents from './imports/makeEyeevents';
import makeProcessJob from './imports/makeProcessJob';
import mergeVideoStimulusRows from './imports/mergeVideoStimulusRows';
import preProcess from './imports/preProcess';
import process from './imports/process';
import removeHeaders from './imports/removeHeaders';
import setFileFormat from './imports/setFileFormat';

Datafiles.collection.helpers({
  assignAois,
  assignStimuli,
  detectFileFormat,
  filterSortFloat,
  generateImotionsEyeevents,
  generateSMIEyeevents,
  getAssignedRows,
  getName,
  getValidCoordinatesOnly,
  getRawData,
  renameRows,
  getStimuliOnly,
  groupRowsByAoi,
  groupRowsByStimulus,
  makeEyeevents,
  makeProcessJob,
  mergeVideoStimulusRows,
  preProcess,
  process,
  removeHeaders,
  setFileFormat,

  study() {
    return this.studyId ? Studies.findOne({ _id: this.studyId }) : undefined;
  },
  getPathFilename() {
    if (Meteor.isDevelopment) {
      return this.path;
    }
    return `${this._storagePath}/${this._id}`;
  },
});
