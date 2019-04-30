export default function getPointTrailTrace(opt) {
  opt = opt || {}
  let initial = opt.initial || false

  let data = {
    x: this.getPointTrail({ ...opt, which: 'x' }),
    y: this.getPointTrail({ ...opt, which: 'y' }),
  }

  if(initial) {
    let name

    if(this.viewing.study().fixationsOnly) {
      name = 'Last ' + data.x.length + ' Fixations'
    } else {
      name = 'Last ' + data.x.length + ' Gaze Points'
    }

    data.name = name
    data.mode = 'lines'
    data.type = 'scatter'
    data.line = { color: '#63a70a', width: 2.5 }
  }

  return data
}
