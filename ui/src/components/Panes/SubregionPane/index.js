import SubregionPane from './SubregionPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

const mapStateToProps = (state, selfProps) => {
  const {data, region, view, series} = state;
  return {
      ...data,
      theme: view.theme,
      columns: series.columns,
      title: region.name
    }
};

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(SubregionPane));
