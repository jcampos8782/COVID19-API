import {createSeriesReducer} from './factory';
export default createSeriesReducer("RT", ({region, series}) => series);
