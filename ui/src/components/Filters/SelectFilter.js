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
      onChange,
      key
    } = this.props;
      return (
          <FormControl style={{display: options.length === 0 ? 'none' : ''}}>
              <InputLabel shrink id={key}>{label}</InputLabel>
              <Select
                variant="standard"
                margin="dense"
                labelId={key}
                value={selected}
                onChange={onChange}
                disabled={options.length === 0}
              >
                  {this.props.default && this.props.default}
                  {
                      options.map(o => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)
                  }
              </Select>
          </FormControl>
      );
  }
}
