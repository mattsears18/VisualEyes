import { Factory } from 'meteor/dburles:factory';

const { expect } = require('chai');

describe('Datafiles.assignVideoTimes()', () => {
  it("doesn't provide the rawData", async () => {
    const datafile = Factory.create('imotionsDatafile');

    expect(() => {
      datafile.assignVideoTimes();
    }).to.throw('noRawData');
  });

  it('gets the video times when all indices match', async () => {
    const datafile = Factory.create('smiDatafile');
    const rawData = await datafile.getRawData();
    datafile.preProcess(rawData);

    const hrstart = process.hrtime();
    const rawDataWithVideoTimes = datafile.assignVideoTimes(rawData);
    const hrend = process.hrtime(hrstart);

    console.info(
      'Time to assign video times (hr): %ds %dms',
      hrend[0],
      hrend[1] / 1000000,
    );
  });
});
