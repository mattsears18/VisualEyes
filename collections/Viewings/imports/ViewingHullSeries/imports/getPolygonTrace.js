export default function getPolygonTrace(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hull = this.getHull(opt)

  if(initial) {
    return {
      name: 'Convex Hull',
      x: hull.polygon({ which: 'x' }),
      y: hull.polygon({ which: 'y' }),
      mode: 'lines',
      type: 'scatter',
      line: {
        color: '#000000',
        width: 2.5,
      },
    }
  } else {
    return {
      x: hull.polygon({ which: 'x' }),
      y: hull.polygon({ which: 'y' }),
    }
  }
}
