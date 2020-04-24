import HospitalizationBadges from './HospitalizationBadges';
import { connect } from 'react-redux';

import { styled } from '../../styles';
import { formatNumber } from '../../util';

const DEFAULT_VALUE = '-';

const formatFact = fact => fact ? `${formatValue(fact.current)}/${formatValue(fact.cumulative)}` : null
const formatValue = value => value ? formatNumber(value) : DEFAULT_VALUE;

const mapStateToProps = state => {
  const {region: { facts: {hospitalizations}}} = state;
  const { cumulative, current } = hospitalizations ? hospitalizations: {cumulative: {}, current: {}};

  return {
    admitted: formatFact({cumulative: cumulative.admitted, current: current.admitted}),
    intensiveCare: formatFact({cumulative: cumulative.intensiveCare, current: current.intensiveCare}),
    onVentilator: formatFact({cumulative: cumulative.onVentilator, current: current.onVentilator})
  }
};

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(HospitalizationBadges));
