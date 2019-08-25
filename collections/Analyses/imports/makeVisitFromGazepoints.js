import Participants from '../../Participants/Participants';
import Stimuli from '../../Stimuli/Stimuli';
import Visits from '../../Visits/Visits';

export default function makeVisitFromGazepoints({
  participantId,
  stimulusId,
  gazepoints = [],
  startIndex = 0,
  endIndex,
  number = 1,
  fileFormat,
}) {
  if (!fileFormat) {
    throw new Error('noFileFormat');
  }

  if (!participantId) {
    throw new Error('noParticipantId');
  }
  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  const stimulus = Stimuli.findOne({ _id: stimulusId });
  if (!stimulusId) {
    throw new Error('noStimulusId');
  }
  if (!stimulus) {
    throw new Error('noStimulusFound');
  }

  let status;
  if (!stimulus.width || !stimulus.height) {
    status = 'invalidStimulusDimensions';
  } else {
    status = 'processed';
  }

  if (!gazepoints.length) {
    throw new Error('noGazepoints');
  }
  if (!gazepoints[startIndex]) {
    throw new Error('startIndexOutOfBounds');
  }

  const _endIndex = endIndex || gazepoints.length - 1;

  if (!gazepoints[_endIndex]) {
    throw new Error('endIndexOutOfBounds');
  }

  const pointsFull = gazepoints.slice(startIndex, _endIndex + 1);
  const points = pointsFull.map(point => ({
    timestamp: point.timestamp,
    x: point.x,
    y: point.y,
    eventIndex: point.eventIndex,
  }));

  let duration = 0;
  duration = gazepoints[_endIndex].timestamp - gazepoints[startIndex].timestamp;
  const fixationCount = this.getVisitFixationCount(points);

  let gazepointFrequency = 0;
  let fixationFrequency = 0;

  if (duration > 0) {
    gazepointFrequency = (points.length / duration) * 1000;
    fixationFrequency = (fixationCount / duration) * 1000;
  }

  const analysis = this;

  return Visits.insert({
    studyId: this.studyId,
    analysisId: analysis._id,
    participantId,
    stimulusId,
    aoiIds: this.getVisitAoiIds(pointsFull),
    number,
    startTime: gazepoints[startIndex].timestamp,
    endTime: gazepoints[_endIndex].timestamp,
    duration,
    gazepoints: points,
    gazepointCount: points.length,
    gazepointFrequency,
    fixationCount,
    fixationFrequency,
    status,
    fileFormat,
  });
}