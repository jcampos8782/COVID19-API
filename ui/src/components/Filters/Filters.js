import React from 'react';

import SelectFilter from './SelectFilter'
import MenuItem from '@material-ui/core/MenuItem';

export default class Filters extends React.Component {
  render() {
      const {
        classes,
        regions,
        loadRegion
      } = this.props;

      let regionFilters = regions.map((filter,idx) => (
        <SelectFilter
          classes={classes}
          key={idx}
          label={filter.label}
          selected={filter.value}
          onChange={(e) => loadRegion(e.target.value)}
          default=<MenuItem value={filter.none} selected><em>None</em></MenuItem>
          options={filter.options} />
      ));

      return (
        <div className={classes.filters}>
          {regionFilters}
        </div>
      );
  }
}
