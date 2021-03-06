export default function getLastPointTrace(opt) {
  opt = opt || {};
  const initial = opt.initial || false;
  const hull = this.getHull(opt);

  const name = 'Last Fixation';

  if (initial) {
    return {
      name,
      x: [hull.points.slice(-1)[0].x],
      y: [hull.points.slice(-1)[0].y],
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: '#FFFFFF',
        size: 15,
        line: {
          color: '#63a70a',
          width: 4,
        },
      },
    };
  }
  return {
    x: [hull.points.slice(-1)[0].x],
    y: [hull.points.slice(-1)[0].y],
  };
}
