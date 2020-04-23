import React from 'react';

import FormControl from '@material-ui/core/FormControl';
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
          <FormControl style={{display: options.length === 0 ? 'none' : ''}}>
              <InputLabel shrink>{label}</InputLabel>
              <Select
                variant="standard"
                margin="dense"
                value={selected}
                onChange={onChange}
                disabled={options.length === 0}
              >
                  {this.props.default && this.props.default}
                  {
                      options.map(o => <MenuItem key={o.value} value={o.value}>{o.text}</MenuItem>)
                  }
              </Select>
          </FormControl>
      );
  }
}
