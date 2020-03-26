import React from 'react';

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class RegionSelect extends React.Component {
  render() {
      return (
          <div>
              <InputLabel>Municipality</InputLabel>
              <Select
                variant="outlined"
                disabled={this.props.options.length === 0}
                label="Municipality"
                value={this.props.selectedMunicipalityId}
                onChange={(e) => this.props.selectMunicipality(e.target.value, this.props.selectedRegionId)}
              >
                  <MenuItem value="-1" selected><em>None</em></MenuItem>
                  {
                      this.props.options.map(m => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)
                  }
              </Select>
          </div>
      );
  }
}
