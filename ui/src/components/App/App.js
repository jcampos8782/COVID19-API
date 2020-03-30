import React from 'react';

import SeriesDataTable from '../SeriesDataTable';
import Filters from '../Filters';

export default class App extends React.Component {
    componentDidMount() {
        Promise.all([this.props.fetchRegions(), this.props.fetchSeriesList()])
          .then(r => this.props.isGeolocationAvailable && this.props.fetchGeolocation());
    }

    render() {
        return (
            <div className="App">
                <Filters />
                <SeriesDataTable />
            </div>
        );
    }
}
