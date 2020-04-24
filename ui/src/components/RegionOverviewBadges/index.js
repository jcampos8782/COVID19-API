import RegionOverviewBadges from './RegionOverviewBadges';
import { connect } from 'react-redux';

import { styled } from '../../styles';
import { formatNumber } from '../../util';

const DEFAULT_VALUE = '-';

const formatValue = value => value ? formatNumber(value) : DEFAULT_VALUE;
const calculatePercentChange = (n,d) => {
    if (d === 0) {
      d = 1;
    }
    return parseFloat(((n / d) * 100).toFixed(1));
}

const mapStateToProps = state => {
  const {region, data} = state;
  if (!(region && data)) {
    return {loading: true}
  }

  let currentDeaths = data.deaths ? data.deaths.current : null;
  let currentConfirmed = data.confirmed ? data.confirmed.current : null;
  let recentDeaths = data.deaths ? data.deaths.mostRecent : null;
  let recentConfirmed = data.confirmed ? data.confirmed.mostRecent : null;
  let percentChangeDeaths = data.deaths ? calculatePercentChange(recentDeaths, currentDeaths) : null;
  let percentChangeConfirmed = data.confirmed ? calculatePercentChange(recentConfirmed, currentConfirmed) : null;

  return {
    population: formatValue(region.demographics.population),
    recovered: formatValue(region.facts.recovered),
    deathsCount: formatValue(currentDeaths),
    confirmedCount: formatValue(currentConfirmed),
    percentChangeDeaths: percentChangeDeaths,
    percentChangeConfirmed: percentChangeConfirmed
  }
};

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(RegionOverviewBadges));
