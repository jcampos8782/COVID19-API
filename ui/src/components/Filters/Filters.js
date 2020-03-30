import React from 'react';

import SelectFilter from './SelectFilter'
import MenuItem from '@material-ui/core/MenuItem';

export default class Filters extends React.Component {
  render() {
      let seriesFilter = (
        <SelectFilter
          label="Series"
          selected={this.props.selectedSeriesId}
          onChange={(e) => this.props.selectSeries(e.target.value, this.props.selectedRegionId)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={this.props.series.map(r => ({ id: r.id, text: r.name }))} />
      )

      let regionsFilter = (
        <SelectFilter
          label="Region"
          selected={this.props.selectedRegionId}
          onChange={(e) => this.props.selectRegion(e.target.value, this.props.selectedSeriesId)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={this.props.regions.map(r => ({ id: r.id, text: r.name }))} />
      );

      let subregionsFilter = (
        <SelectFilter
          label="Subregion"
          selected={this.props.selectedSubregionId}
          disabled={this.props.subregions.length === 0}
          onChange={(e) => this.props.selectSubregion(e.target.value)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={this.props.subregions.map(r => ({ id: r.id, text: r.name }))} />
      );

      return (
          <div>
            {regionsFilter}
            {subregionsFilter}
            {seriesFilter}
          </div>
      );
  }
}
