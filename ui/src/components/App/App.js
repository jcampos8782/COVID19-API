import React from 'react';

import CasesTable from '../CasesTable';
import MunicipalitySelect from '../MunicipalitySelect';
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
                <MunicipalitySelect />
                <CasesTable />
            </div>
        );
    }
}
