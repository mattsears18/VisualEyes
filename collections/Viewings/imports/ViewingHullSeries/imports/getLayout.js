export default function getLayout(opt) {
  opt = opt || {};

  if (typeof this.viewing.stimulus().stimulusfile() === 'undefined') {
    throw new Error('noStimulusfile');
  }

  const forceHeight = 600;
  const scale = forceHeight / this.viewing.stimulus().stimulusfile().fileHeight;
  const margin = {
    l: 50,
    r: 10,
    b: 20,
    t: 0,
    pad: 4,
  };

  let yrange;

  if (this.viewing.datafile().fileFormat === 'imotions') {
    yrange = [this.viewing.stimulus().height, 0];
  } else {
    yrange = [0, this.viewing.stimulus().height];
  }

  return {
    xaxis: {
      range: [0, this.viewing.stimulus().width],
      showticklabels: true,
    },
    yaxis: {
      range: yrange,
      showticklabels: true,
    },
    height: forceHeight + margin.b + margin.t,
    width:
      this.viewing.stimulus().stimulusfile().fileWidth * scale
      + margin.l
      + margin.r
      + 146,
    margin,
    images: [
      {
        source: Stimulusfiles.link(this.viewing.stimulus().stimulusfile()),
        xref: 'paper',
        yref: 'paper',
        x: 0,
        y: 0,
        sizex: 1,
        sizey: 1,
        sizing: 'stretch',
        xanchor: 'left',
        yanchor: 'bottom',
        layer: 'below',
      },
    ],
    hovermode: 'closest',
  };
}
