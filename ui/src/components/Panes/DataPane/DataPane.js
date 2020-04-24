import React from 'react';

import TabPanel from '../TabPanel';
import TimeSeriesDataTable from '../../TimeSeriesDataTable';

export default class DataPane extends React.Component {
  render() {
    const {
      data,
      loading,
      columns,
      title,
      value,
      index
    } = this.props;

    if (loading) {
      return <div />
    }

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
