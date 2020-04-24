import DataPane from './DataPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

const mapStateToProps = (state, selfProps) => {
  const {data, region, series} = state;
  return {
      data: Object.keys(data).map(
        component => ({ id: component, data: data[component].aggregates.total})
      ),
      columns: series.columns,
      title: region.name
    }
};

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(DataPane));
