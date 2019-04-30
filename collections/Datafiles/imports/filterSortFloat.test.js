require('./../../factories.test')
const expect = require('chai').expect

describe('Datafiles.filterSortFloat()', () => {
  it('filters out non float values and sorts by timestamp', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { timestamp: '', x: '1' },
      { timestamp: '-', x: '2' },
      { timestamp: 'dsfd', x: '3' },
      { x: '4' },
      { timestamp: 'one', x: '5' },
      { timestamp: '4', x: '9' },
      { timestamp: 2.67564, x: '7' },
      { timestamp: 2, x: '6' },
      { timestamp: 3, x: '8' },
      { timestamp: undefined, x: '10' },
    ];

    let expectedRows = [
      { timestamp: 2, x: '6' },
      { timestamp: 2.67564, x: '7' },
      { timestamp: 3, x: '8' },
      { timestamp: '4', x: '9' },
    ];

    expect(datafile.filterSortFloat('timestamp', rows)).to.eql(expectedRows);
  });
});
