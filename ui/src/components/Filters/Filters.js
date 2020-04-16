import React from 'react';

import SelectFilter from './SelectFilter'
import MenuItem from '@material-ui/core/MenuItem';

export default class Filters extends React.Component {
  render() {
      const {
        classes,
        regions,
        selectRegion
      } = this.props;

      let regionFilters = regions.map((filter,idx) => (
        <SelectFilter
          classes={classes}
          key={idx}
          label={filter.label}
          selected={filter.selectedId}
          onChange={(e) => selectRegion(idx, e.target.value)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={filter.options} />
      ));

      return (
        <div className={classes.filters}>
          {regionFilters}
        </div>
      );
  }
}
