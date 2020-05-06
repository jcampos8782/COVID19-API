import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { ResponsiveBar } from '@nivo/bar'

import { uppercaseFirst, formatNumber } from '../../util';
import {light, dark} from '../../styles';

export default class Recent extends React.Component {
  render() {
    const {
      theme,
      classes,
      data,
      series,
      columns,
      selectPeriod,
      selectSeries,
      selectedSeries,
      seriesOptions,
      periodOptions
    } = this.props;

    if (!data) {
      return <CircularProgress style={{margin:150}} />
    }

    const palette = theme === 'light' ? light.palette : dark.palette;
    
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Recent Totals</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item className={classes.trendsControlContainer} xs={12} md={6}>
              <FormControl style={{display: "inline-block"}} displaycomponent="fieldset">
                <RadioGroup  value={selectedSeries}  />
                {
                  seriesOptions.map(o => (
                    <FormControlLabel
                      key={o}
                      checked={selectedSeries === o}
                      value={o}
                      label={<Typography variant="caption">{uppercaseFirst(o)}</Typography>}
                      labelPlacement="start"
                      disabled={series.indexOf(o) === -1}
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
            <ResponsiveBar
              data={columns.map((date, idx) => ({
                date: date,
                ...Object.keys(data).reduce((obj, region) => {
                  obj[region] = data[region][idx]
                  return obj;
                }, {})
              }))}
              keys={Object.keys(data)}
              indexBy="date"
              margin={{ right: 130, bottom: 50, left: 40 }}
              padding={0.15}
              innerPadding={3}
              borderRadius={5}
              borderWidth={2}
              enableLabel={true}
              colors={{ scheme: palette.nivo.bar.colors }}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  format: v => new Date(v).toLocaleString('default', { month: 'short', day: 'numeric'}),
                  tickSize: 15,
                  tickValues: columns.reverse().map((c, idx) => idx % (Math.floor(columns.length / 7)) === 0 ? c : null).filter(c => c),
                  itemTextColor: palette.nivo.bar.text,
                  tickRotation: 30
              }}
              axisLeft={{
                 tickSize: 5,
                 tickPadding: 5,
                 tickRotation: 0
              }}
              labelSkipWidth={25}
              labelSkipHeight={12}
              labelTextColor={palette.nivo.bar.text}
              legends={[
                 {
                     dataFrom: 'keys',
                     anchor: 'bottom-right',
                     direction: 'column',
                     justify: false,
                     translateX: 120,
                     translateY: 0,
                     itemsSpacing: 2,
                     itemWidth: 100,
                     itemHeight: 20,
                     itemDirection: 'left-to-right',
                     itemOpacity: 0.85,
                     itemTextColor: palette.nivo.bar.text,
                     symbolSize: 20,
                     effects: [
                         {
                             on: 'hover',
                             style: {
                                 itemOpacity: 1
                             }
                         }
                     ]
                 }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: palette.nivo.bar.text
                    }
                  }
                },
                markers: {
                  lineColor: palette.nivo.bar.text
                },
                tooltip: {
                  container: {
                    background: 'rbga(0,0,0,.5)',
                    boxShadow: 0
                  }
                }
              }}
              tooltip={({id, value, color}) => (
                <Paper style={{padding: 3}}>
                  <List dense style={{padding:0}}>
                    <ListItem style={{padding: 0}}alignItems="flex-start" justify="flex-start">
                      <ListItemIcon style={{marginTop: 10, minWidth:15}}>
                        <Icon fontSize="small" className="fas fa-circle xs" style={{color: color, fontSize: ".75em", paddingRight: 0}}/>
                      </ListItemIcon>
                      <ListItemText>
                          <strong>{id}</strong>: {formatNumber(value)}
                      </ListItemText>
                    </ListItem>
                  </List>
                </Paper>
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
