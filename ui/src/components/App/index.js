import App from './App';

import { connect } from 'react-redux';
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);
