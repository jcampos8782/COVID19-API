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
        subregions,
        locales,
        series,
        selectedRegionId,
        selectedSubregionId,
        selectedLocaleId,
        selectedSeriesId,
        selectRegion,
        selectSubregion,
        selectLocale,
        selectSeries,
      } = this.props;

      let locationIcon = (
        <Tooltip title={`Location ${location.enabled ? 'enabled' : 'disabled'}`} placement="top-end">
            <Icon className={`${location.enabled ? classes.success : classes.warning} fas fa-map-marker-alt fa-xs`} />
          </Tooltip>
      );

      let regionsFilter = (
        <SelectFilter
          label=<div>{locationIcon} Region</div>
          selected={selectedRegionId}
          onChange={(e) => selectRegion(e.target.value, selectedSeriesId)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={regions.map(r => ({ id: r.id, text: r.name }))} />
      );

      let subregionsFilter = (
        <SelectFilter
          label="Subregion"
          selected={selectedSubregionId}
          disabled={subregions.length === 0}
          onChange={(e) => selectSubregion(e.target.value)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={subregions.map(r => ({ id: r.id, text: r.name }))} />
      );

      let localesFilter = locales && (
        <SelectFilter
          label="County"
          selected={selectedLocaleId}
          disabled={subregions.length === 0}
          onChange={(e) => selectLocale(e.target.value)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={locales.map(r => ({ id: r.id, text: r.name }))} />
      );

      let seriesFilter = (
        <SelectFilter
          label="Series"
          selected={selectedSeriesId}
          onChange={(e) => selectSeries(e.target.value, selectedRegionId)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={series.map(r => ({ id: r.id, text: r.name }))} />
      )

      return (
          <Grid item
            className={classes.filters}>
              {regionsFilter}
              {subregionsFilter}
              {localesFilter}
              {seriesFilter}
          </Grid>
      );
  }
}
