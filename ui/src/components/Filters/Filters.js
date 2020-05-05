import React from 'react';

import SelectFilter from './SelectFilter'

export default class Filters extends React.Component {
  render() {
      const {
        classes,
        filters,
        series,
        loadRegion
      } = this.props;
      
      return (
        <div className={classes.filters}>
          {
            filters.map((filter,idx) => (
              <SelectFilter
                classes={classes}
                key={idx}
                label={filter.label}
                selected={filter.value}
                onChange={(e) => loadRegion(e.target.value, series)}
                defaultItem={{value: filter.none, label: 'None'}}
                options={filter.options}
                icon={filter.icon}
                iconAction={() => loadRegion(filter.none, series)}
              />
            ))
          }
        </div>
      );
  }
}
