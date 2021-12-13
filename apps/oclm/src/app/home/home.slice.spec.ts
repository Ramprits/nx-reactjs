import { fetchHome, homeAdapter, homeReducer } from './home.slice';

describe('home reducer', () => {
  it('should handle initial state', () => {
    const expected = homeAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(homeReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchHomes', () => {
    let state = homeReducer(undefined, fetchHome.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = homeReducer(state, fetchHome.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = homeReducer(
      state,
      fetchHome.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
