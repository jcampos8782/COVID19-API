import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
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
      icon,
      iconAction,
      defaultItem,
      classes
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
                  <MenuItem value={defaultItem.value} selected><em>{defaultItem.label}</em></MenuItem>
                  {
                      options.map(o => <MenuItem key={o.value} value={o.value}>{o.text}</MenuItem>)
                  }
              </Select>
              {icon && <IconButton disabled={selected === defaultItem.value} className={`${classes.filterIcon}`} onClick={iconAction}><Icon className={`${icon}`} /></IconButton> }
          </FormControl>
      );
  }
}
