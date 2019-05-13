require('./../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.getRawCSV()', () => {
    it('has 12,271 rows of raw data', async () => {
      const imotionsDatafile = Factory.create('imotionsDatafile');
      expect((await imotionsDatafile.getRawCSV()).length).to.equal(12271);
    });

    it('has 12,742 rows of raw data', async () => {
      const smiDatafile = Factory.create('smiDatafile');
      expect((await smiDatafile.getRawCSV()).length).to.equal(12742);
    });
  });
}
