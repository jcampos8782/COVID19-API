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
      onChange,
      disabled
    } = this.props;
      return (
          <div>
              <InputLabel>{this.props.label}</InputLabel>
              <Select
                variant="outlined"
                label={label}
                value={selected}
                onChange={onChange}
                disabled={disabled}
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
