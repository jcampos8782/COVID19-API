import React from 'react';

import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import SelectFilter from './SelectFilter'
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

export default class Filters extends React.Component {
  render() {
      const {
        classes,
        location,
        regions,
        series,
        selectedSeriesId,
        selectedRegionId,
        selectRegion,
        selectSeries,
      } = this.props;

      let locationIcon = (
        <Tooltip title={`Location ${location.enabled ? 'enabled' : 'disabled'}`} placement="top-end">
            <Icon className={`${location.enabled ? classes.success : classes.warning} fas fa-map-marker-alt fa-xs`} />
          </Tooltip>
      );

      let regionFilters = regions.map((filter,idx) => (
        <SelectFilter
          key={idx}
          label=<div>{ idx === 0 && locationIcon} {filter.label}</div>
          selected={filter.selectedId}
          onChange={(e) => selectRegion(idx, e.target.value)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={filter.options} />
      ));

      let seriesFilter = (
        <SelectFilter
          label="Series"
          selected={selectedSeriesId}
          onChange={(e) => selectSeries(e.target.value, selectedRegionId)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={series} />
      )

      return (
          <Grid item
            className={classes.filters}>
              {regionFilters}
              {seriesFilter}
          </Grid>
      );
  }
}
