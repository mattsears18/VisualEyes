Template.PlotHistogramViewingCounts.helpers({
  x: () => getX(),

  layout: () => ({
    title: 'Viewing Counts',
    xaxis: {
      title: '# of Viewings per Participant per Stimulus',
      dtick: 1,
    },
    yaxis: {
      title: 'Frequency',
    },
    margin: {
      l: 60,
      r: 10,
      b: 70,
      t: 50,
    },
    bargap: 0.06,
  }),
});

function getX() {
  viewings = Template.currentData().viewings.fetch();
  return helpers.getViewingCounts(viewings);
}
