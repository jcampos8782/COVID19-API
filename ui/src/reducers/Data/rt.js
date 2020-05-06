import {createSeriesReducer} from './factory';
export default createSeriesReducer("RT", ({region, series}) => {
  return series.data.length === 1
    ? series.data[0].data
    : {};
});
