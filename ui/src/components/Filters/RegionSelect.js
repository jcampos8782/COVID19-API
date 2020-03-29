import React from 'react';

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class Filters extends React.Component {
  componentDidMount() {
      if(this.props.onMount) {
        this.props.onMount();
      }
  }

  render() {
      return (
          <div>
              <InputLabel>{this.props.label}</InputLabel>
              <Select
                variant="outlined"
                label={this.props.label}
                value={this.props.selected}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
              >
                  {this.props.default ? this.props.default : "" }
                  {
                      this.props.options.map(o => <MenuItem key={o.id} value={o.id}>{o.text}</MenuItem>)
                  }
              </Select>
          </div>
      );
  }
}
