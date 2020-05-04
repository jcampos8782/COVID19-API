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
    
    if (!data) {
      return <div />
    }

    return (
      <TabPanel
        value={value}
        index={index}
        children={
          <TimeSeriesDataTable
            data={Object.keys(data).map(component => ({ id: component, data: data[component].aggregates.total}))}
            meta={{ columns: columns, title: title }}
          />
        }
      />
    )
  }
}
