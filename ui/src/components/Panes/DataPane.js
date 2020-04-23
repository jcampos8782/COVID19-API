import React from 'react';

import TabPanel from './TabPanel';
import TimeSeriesDataTable from '../TimeSeriesDataTable';

export default class HistoryPane extends React.Component {
  render() {
    const {data, meta, value, index} = this.props;
    return (
      <TabPanel
        value={value}
        index={index}
        children={
          <TimeSeriesDataTable
            data={Object.keys(data).map(series => ({ id: series, data: data[series].data.aggregates.total}))}
            meta={{
              columns: meta.columns,
              title: meta.region
            }}
          />
        }
      />
    )
  }
}
