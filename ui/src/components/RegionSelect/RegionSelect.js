import React from 'react';

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class RegionSelect extends React.Component {
  componentDidMount() {
      this.props.fetchRegions()
  }

  render() {
      return (
          <div>
              <InputLabel>Region</InputLabel>
              <Select
                variant="outlined"
                label="Region"
                value={this.props.selectedRegionId}
                onChange={(e) => this.props.selectRegion(e.target.value)}
              >
                  <MenuItem value="-1" selected><em>None</em></MenuItem>
                  {
                      this.props.regions.map(region => <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>)
                  }
              </Select>
          </div>
      );
  }
}
