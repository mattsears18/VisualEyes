export default function makeViewingsByParticipantStimulus(analysis, participant, stimulus) {
  Viewings.remove({
    analysisId: analysis._id,
    participantId: participant._id,
    stimulusId: stimulus._id,
  });

  number = 1;

  // console.log('ignoreOutsideImage: ' + analysis.ignoreOutsideImage);

  search = { participantId: participant._id, stimulusId: stimulus._id };

  if(analysis.ignoreOutsideImage) {
    if(stimulus.width) {
      search.x = { $gte: 0, $lte: stimulus.width };
    } else {
      search.x = { $gte: 0 };
    }

    if(stimulus.height) {
      search.y = { $gte: 0, $lte: stimulus.height };
    } else {
      search.y = { $gte: 0 };
    }
  }

  recordings = Recordings.find(search, {sort: {recordingTime: 1}});

  // console.log('recording count: ' + recordings.count());
  // console.log('minViewingTime: ' + analysis.minViewingTime);
  // console.log('viewingGap: ' + analysis.viewingGap);
  // console.log('');

  minViewingTime = analysis.minViewingTime;
  viewingGap = analysis.viewingGap;

  // console.log(recordings);
  recordingsArr = recordings.fetch();

  indices = [];
  start = 0;
  end = 0;
  startTime = 0;
  endTime = 0;
  potentialEndTime = 0;
  potentialStep = 0;

  recordingsArr.forEach(function(recording, ri) {
    // console.log(ri);
    // console.log('check for viewingGap');

    startTime = recordingsArr[start].recordingTime;
    endTime = recordingsArr[end].recordingTime;
    potentialEndTime = recording.recordingTime;
    potentialStep = potentialEndTime - endTime;

    // console.log('start: ' + start);
    // console.log('end: ' + end);
    // console.log('potential end: ' + ri);
    // console.log('viewingGap: ' + viewingGap);
    // console.log('start time: ' + startTime);
    // console.log('end time: ' + endTime);
    // console.log('potential end time: ' + potentialEndTime);
    // console.log('potential step: ' + potentialStep);

    // console.log('');
    // console.log('ri + 1: ' + (ri + 1));
    // console.log('count: ' + recordings.count());
    // console.log('');

    if(potentialStep < viewingGap) {
      //add current recording to viewing set
      end = ri;

      if((ri + 1) == recordingsArr.length) {
        // console.log('end of stimulus reached');
        checkMinTime();
      }
    } else {
      //viewing gap too large, check if minViewingTime reached
      // console.log('step too large, check if minimum viewing time acheived');
      checkMinTime();
    }
  });

  function checkMinTime() {
    potentialTotalTime = endTime - startTime;
    // console.log('potential total time: ' + potentialTotalTime);

    if(potentialTotalTime > minViewingTime) {
      // console.log('minimum viewing time reached, add new viewing indices');
      // console.log('viewing indices: ' + '[' + start + ', ' + end + ']');
      indices.push({start: start, end: end});

      recordingIds = [];
      aoiIds = [];

      for(i = start; i <= end; i++) {
        // console.log('start: ' + start);
        // console.log('end: ' + end);
        // console.log(recordingsArr[i]);
        // console.log('');
        recordingIds.push(recordingsArr[i]._id);
        if(!aoiIds.includes(recordingsArr[i].aoiId)) {
          aoiIds.push(recordingsArr[i].aoiId);
        }
      }

      // participant = Participants.findOne({ participantId: participant._id });

      Viewings.insert({
        analysisId: analysis._id,
        studyId: analysis.studyId,
        participantId: participant._id,
        stimulusId: stimulus._id,
        number: number,
        recordingIds: recordingIds,
        aoiIds: aoiIds,
      }, function(err, viewingId){
        if(err) {
          console.log(err);
        } else {
          // viewing = Viewings.findOne(viewingId);
          Meteor.call('viewings.makeHullJobs', { viewingId: viewingId });
        }
      });

      number++;
    } else {
      // console.log('duration too short, no new viewing');
    }

    // console.log('');

    end = end + 1;
    start = end;
  }

  return indices;
}