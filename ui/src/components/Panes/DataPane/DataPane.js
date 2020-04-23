import React from 'react';

import TabPanel from '../TabPanel';
import TimeSeriesDataTable from '../../TimeSeriesDataTable';

export default class DataPane extends React.Component {
  render() {
    const {
      data,
      columns,
      title,
      value,
      index
    } = this.props;
    return (
      <TabPanel
        value={value}
        index={index}
        children={
          <TimeSeriesDataTable
            data={data}
            meta={{ columns: columns, title: title }}
          />
        }
      />
    )
  }
}
