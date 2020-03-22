import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import '../styles/App.css';

import { setGeoCoord, selectRegion } from '../actions';

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    setGeoCoord: () => dispatch(setGeoCoord()),
    selectRegion: (id) => dispatch(selectRegion(id))
});

class App extends Component {
    render() {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
                <pre>
                {
                    JSON.stringify(this.props)
                }
                </pre>
                <button onClick={() => this.props.selectRegion(2) }>Test redux</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
