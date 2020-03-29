import React from 'react';

import RegionSelect from './RegionSelect'
import MenuItem from '@material-ui/core/MenuItem';

export default class Filters extends React.Component {
  render() {
      let regionsFilter = (
        <RegionSelect
          label="Region"
          selected={this.props.selectedRegionId}
          onMount={this.props.fetchRegions}
          onChange={(e) => this.props.selectRegion(e.target.value)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={this.props.regions.map(r => ({ id: r.id, text: r.name }))} />
      );

      let subregionsFilter = (
        <RegionSelect
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
          </div>
      );
  }
}
