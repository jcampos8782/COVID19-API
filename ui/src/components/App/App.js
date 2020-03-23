import React from 'react';

import CasesTable from '../CasesTable';
import RegionSelect from '../RegionSelect';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <RegionSelect />
                <CasesTable />
            </div>
        );
    }
}
