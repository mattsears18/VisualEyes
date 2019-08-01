import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Study.makeDefaultAnalyses()', () => {
  it('makes 88 analyses, even though it has no participants or stimuli', () => {
    const study = Factory.create('study');
    study.makeDefaultAnalyses();

    expect(study.analyses().count()).to.eql(96);
  });
});
