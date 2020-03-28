import SeriesDataTable from './SeriesDataTable';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ data: state.series });

export default connect(mapStateToProps)(SeriesDataTable);
