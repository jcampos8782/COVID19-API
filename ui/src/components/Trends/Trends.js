import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import BadgedIcon from '../BadgedIcon';
import TimeSeriesHeatMap from '../TimeSeriesHeatMap';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

import {light, dark} from '../../styles';
import { formatDateKey, uppercaseFirst } from '../../util';

export default class Trends extends React.Component {
  render() {
    const {
      columns,
      theme,
      data,
      loading,
      classes,
      selectedPeriod,
      selectedSeries,
      periodOptions,
      seriesOptions,
      selectSeries,
      selectPeriod
    } = this.props;

    if (loading) {
      return <CircularProgress style={{margin:150}} />;
    };

    let palette = theme === 'light' ? light.palette : dark.palette;
    let doublingConfirmed = data.trends["confirmed"].doubling;
    let doublingDeaths = data.trends["deaths"].doubling;

    return (
      <Grid container style={{marginTop: 10}}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Growth Rate
          </Typography>
        </Grid>
        <Grid item style={{height:30, marginTop: 15, marginBottom: 20}} xs={12} md={12} lg={12}>
          <TimeSeriesHeatMap
            keys={columns}
            theme={theme}
            data={
              //[{series: "series", "date":"value"...}]
              data.keys.map(key => (
              {
                series: key,
                ...columns.reduce((obj,date,idx) => {
                  obj[date] = data.trends[key].rolling[idx]
                  return obj;
                },{})
              }))
            }
            />
        </Grid>
        <Grid item xs={12}>
          <Grid container >
            <Grid item xs={12} sm={3} md={2}>
              <Grid container className={classes.trendsDoublingContainer}>
                <Grid item xs={6} sm={12}>
                  <BadgedIcon
                    title="Will double in"
                    iconClass={`${classes.orange} fas fa-head-side-cough`}
                    value={
                      Number.isFinite(doublingConfirmed)
                        ? `${doublingConfirmed} days`
                        : <Icon className={`${classes.xsIcon} fas fa-infinity`} />
                      }
                    />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <BadgedIcon
                    title="Will double in"
                    color="error"
                    iconClass="fas fa-skull-crossbones"
                    value={
                      Number.isFinite(doublingDeaths)
                        ? `${doublingDeaths} days`
                        : <Icon className={`${classes.xsIcon} fas fa-infinity`} />
                      }
                    />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9} md={10}>
              <Grid container>
                <Grid item className={classes.trendsControlContainer} xs={12} md={6}>
                  <FormControl style={{display: "inline-block"}} displaycomponent="fieldset">
                    <RadioGroup  value={selectedPeriod}  />
                    {
                      seriesOptions.map(o => (
                        <FormControlLabel
                          key={o}
                          checked={selectedSeries === o}
                          value={o}
                          label={<Typography variant="caption">{uppercaseFirst(o)}</Typography>}
                          labelPlacement="start"
                          disabled={Object.keys(data.trends).indexOf(o) === -1}
                          control={<Radio size="small" onChange={e => selectSeries(e.target.value)} /> }
                          />
                      ))
                    }
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Slider
                    className={classes.recentDataSlider}
                    defaultValue={periodOptions[0]}
                    max={periodOptions[periodOptions.length - 1]}
                    step={null}
                    valueLabelDisplay="auto"
                    marks={periodOptions.map(p => ({ value: p, label: `${p} Days`}))}
                    onChangeCommitted={(e, period) =>  selectPeriod(period)}
                    />
                </Grid>
              </Grid>
              <Grid container style={{height: 300}}>
                <TimeSeriesLineChart
                  curve="natural"
                  labelFormat={v => `${v}%`}
                  theme={theme}
                  max={
                    data.trends[selectedSeries].daily.reduce((max,curr) => curr > max ? curr : max, 0)
                  }
                  markers={
                    data.sipOrderDate > new Date(columns[0])
                      ? [{
                          axis: 'x',
                          value: data.sipOrderDate,
                          legend: "Shelter-in-Place Order",
                          lineStyle: {
                            strokeDasharray: '1, 8',
                            strokeWidth: 3,
                            strokeLinejoin: 'round',
                            strokeLinecap: 'round'
                          },
                          textStyle: {
                            fill: palette.nivo.line.text
                          },
                          legendOffsetY: 50
                        }]
                        : null
                      }
                  layers={['grid', 'areas', Lines,  'slices', 'points', 'axes', 'markers', 'legends']}
                  data={[
                    {
                      id: "Daily",
                      data: data.trends[selectedSeries].daily.map((val,idx) => ({
                          x: formatDateKey(columns[idx]),
                          y: val
                        }
                      ))
                    },
                    {
                      id: "Rolling",
                      data: data.trends[selectedSeries].rolling.map((val,idx) => ({
                          x: formatDateKey(columns[idx]),
                          y: val
                        }
                      ))
                    }
                  ]
                }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const styleById = {
    Rolling: {
        strokeDasharray: '12, 6',
        strokeWidth: 2,
    },
    default: {
        strokeWidth: 2,
    },
}

const Lines = ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }) => (
        <path
            key={id}
            d={lineGenerator(
                data.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y),
                }))
            )}
            fill="none"
            stroke={color}
            style={styleById[id] || styleById.default}
        />
    ))
}
