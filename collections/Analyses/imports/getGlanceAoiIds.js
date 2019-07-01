export default function getGazeAoiIds(gazepoints) {
  const aoiIds = [];

  gazepoints.forEach((point) => {
    if (point.aoiId) {
      if (!aoiIds.includes(point.aoiId)) {
        aoiIds.push(point.aoiId);
      }
    }
  });

  return aoiIds;
}