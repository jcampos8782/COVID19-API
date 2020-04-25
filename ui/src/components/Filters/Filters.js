import React from 'react';

import SelectFilter from './SelectFilter'

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
          defaultItem={{value: filter.none, label: 'None'}}
          options={filter.options}
          icon={filter.icon}
          iconAction={() => loadRegion(filter.none)}
          />
      ));

      return (
        <div className={classes.filters}>
          {regionFilters}
        </div>
      );
  }
}
