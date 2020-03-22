import React from 'react';

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class RegionSelect extends React.Component {
    render() {
        return (
            <div>
                <InputLabel>Region</InputLabel>
                <Select value={this.props.selectedRegionId} onChange={(e) => this.props.selectRegion(e.target.value)}>
                    <MenuItem value="-1" selected><em>None</em></MenuItem>
                    {
                        this.props.regions.map(region => <MenuItem value={region.id}>{region.name}</MenuItem>)
                    }
                </Select>
            </div>
        );
    }
}
