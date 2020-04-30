export { default as data } from './data';
export { default as errors } from './errors';
export { default as headlines } from './headlines';
export { default as loading } from './loading';
export { default as location } from './location';
export { default as region } from './region';
export { default as series } from './series';
export { default as view } from './view';

export const selectors = {
  selectData: state => state.data,
  selectErrors: state => state.errors,
  selectLoading: state => state.loading,
  selectLocation: state => state.location,
  selectHeadlines: state => state.headlines,
  selectRegion: state => state.region,
  selectSeries: state => state.series,
  selectView: state => state.view
};
