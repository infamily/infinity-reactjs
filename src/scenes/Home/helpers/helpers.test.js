import { validateHomeParams } from './index';

describe('<Home /> (helpers)', () => {
  it('returns an empty object', () => {
    expect(
      validateHomeParams({
        flag: '-1',
        topicSource: '4',
        view: 'abv'
      })
    ).toMatchObject({});
  });

  it('contains 3 properies', () => {
    const params = validateHomeParams({
      flag: '1',
      topicSource: '0',
      view: 'grid'
    });

    expect(Object.keys(params).length).toBe(3);
  });

  it('contains 5 properies', () => {
    const params = validateHomeParams({
      flag: '1',
      topicSource: '0',
      view: 'grid',
      query: 'global',
      categories: '1,2,3'
    });

    expect(Object.keys(params).length).toBe(3);
  });
});
