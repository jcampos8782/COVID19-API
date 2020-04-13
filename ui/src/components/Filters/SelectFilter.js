import React from 'react';

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class SelectFilter extends React.Component {

  render() {
    let {
      label,
      options,
      selected,
      onChange
    } = this.props;
      return (
          <div style={{display: options.length === 0 ? 'none' : ''}}>
              <InputLabel>{this.props.label}</InputLabel>
              <Select
                variant="outlined"
                label={label}
                value={selected}
                onChange={onChange}
                disabled={options.length === 0}
              >
                  {this.props.default && this.props.default}
                  {
                      options.map(o => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)
                  }
              </Select>
          </div>
      );
  }
}
