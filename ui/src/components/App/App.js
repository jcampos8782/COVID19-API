import React from 'react';

import SeriesDataTable from '../SeriesDataTable';
import RegionSelect from '../RegionSelect';

export default class App extends React.Component {
    componentDidMount() {
        if (this.props.isGeolocationAvailable) {
          this.props.fetchGeolocation();
        }
    }

    render() {
        return (
            <div className="App">
                <RegionSelect />
                <SeriesDataTable />
            </div>
        );
    }
}
