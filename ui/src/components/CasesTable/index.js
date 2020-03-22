import CasesTable from './CasesTable';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ cases: state.cases });

export default connect(mapStateToProps)(CasesTable);
