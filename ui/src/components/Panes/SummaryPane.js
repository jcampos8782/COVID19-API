import React from 'react';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import TabPanel from './TabPanel';
import TimeSeriesHeatMap from '../TimeSeriesHeatMap';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

import { ResponsivePie } from '@nivo/pie';

import { formatDateKey } from '../../util';

export default class SummaryPane extends React.Component {
  render() {
    const { data, meta, view, value, index } = this.props;

    let trends = (
      <Grid container>
        <Grid item style={{height:30, marginTop: 15, marginBottom: 20}} xs={12} md={12} lg={12}>
          <TimeSeriesHeatMap
            keys={meta.columns}
            theme={view.theme}
            data={
              //[{series: "series", "date":"value"...}]
              data.map(series => (
              {
                series: series.id,
                ...meta.columns.reduce((obj,date,idx) => {
                  let values = series.data.aggregates.daily;
                  let current = values[idx];
                  let lastWeek = idx > 7 ? values[idx - 7] : values[0];
                  let difference = current - lastWeek;
                  let denom = lastWeek === 0 ? 1 : lastWeek;
                  let percentChange = ((difference / denom) * 100).toFixed(2);
                  obj[date] = parseFloat(percentChange)
                  return obj;
                },{})
              }))
            }
            />
        </Grid>
      </Grid>
    );
    let lastSeven = (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Last 7 Days</Typography>
        </Grid>
        <Grid item style={{height:300}} xs={12}>
          <TimeSeriesLineChart
            theme={view.theme}
            title="Last 7 Days"
            data={data.map(series => (
              {
                id: series.id,
                data: series.data.recent.data.map((val,idx) => ({
                    x: formatDateKey(meta.columns[meta.columns.length - 7 + idx]),
                    y: val
                  }
                ))
              }
            ))
          }
          />
        </Grid>
      </Grid>
    );

    let testing = (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Test Results</Typography>
        </Grid>
        <Grid item style={{height:250}} xs={12}>
          <TestsGraph {...this.props}/>
        </Grid>
      </Grid>
    );

    return (
      <TabPanel
        value={value}
        index={index}
        children={
          <Grid container>
            <Overview {...this.props}/>
            {trends}
            <Hospitalizations {...this.props} />
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {lastSeven}
                </Grid>
                <Grid item xs={12} md={6}>
                  {testing}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      />
    )
  }
}

const Overview = props => (
  <Grid container>
    <Grid item xs={6} sm={3}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption">Population</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={3} lg={4}>
          <Icon color="primary" style={{paddingRight: 10}} className={`${props.classes.icon} fas fa-users`}/>
        </Grid>
        <Grid item xs={8} sm={10} md={9} lg={8}>
          <Typography variant="button">{'-'}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6} sm={3}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption">Recovered</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={3} lg={4}>
          <Icon style={{paddingRight: 10}} className={`${props.classes.icon} ${props.classes.green} fas fa-heartbeat`}/>
        </Grid>
        <Grid item xs={8} sm={10} md={9} lg={8}>
          <Typography variant="button">{'3000'}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6} sm={3}>
      <Grid container>
        <Grid item xs={6} >
          <Typography variant="caption">Confirmed</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption"><Icon className={`${props.classes.red} ${props.classes.xsIcon} fas fa-arrow-up xs`} /> 5%</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={3} lg={4}>
          <Icon color="secondary" style={{paddingRight: 10}} className={`${props.classes.icon} fas fa-head-side-cough`}/>
        </Grid>
        <Grid item xs={8} sm={10} md={9} lg={8}>
          <Typography variant="button">{'-'}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6} sm={3}>
      <Grid container>
        <Grid item xs={6} >
          <Typography variant="caption">Deaths</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption"><Icon className={`${props.classes.red} ${props.classes.xsIcon} fas fa-arrow-up xs`} /> 5%</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={3} lg={4}>
          <Icon color="error" style={{paddingRight: 10}} className={`${props.classes.icon} fas fa-skull-crossbones`}/>
        </Grid>
        <Grid item xs={8} sm={10} md={9} lg={8}>
          <Typography variant="button">{'-'}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const Hospitalizations = props => (
  <Grid container style={{paddingBottom: 20}}>
    <Grid item xs={12}>
      <Typography variant="h6">Hospitalizations</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="overline">Current/Cumulative</Typography>
    </Grid>
    <Grid item xs={6} sm={4}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption">Admitted</Typography>
        </Grid>
        <Grid item xs={3}>
          <Icon color="error" style={{paddingRight: 10}} className={`${props.classes.icon} fas fa-clinic-medical`}/>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="button">{'- / -'}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6} sm={4}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption">Intensive Care</Typography>
        </Grid>
        <Grid item xs={3}>
          <Icon color="error" style={{paddingRight: 10}} className={`${props.classes.icon} fas fa-procedures`}/>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="button">{'- / -'}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6} sm={4}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption">Ventilator</Typography>
        </Grid>
        <Grid item xs={3}>
          <Icon color="error" style={{paddingRight: 10}} className={`${props.classes.icon} fas fa-lungs-virus`}/>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="button">{'- / -'}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

const TestsGraph = props => (
  <ResponsivePie
      data={
        [
          { id: "positive", label: "Positive", value: 29000 },
          { id: "negative", label: "Negative", value: 290000},
          { id: "pending", label: "Pending", value: 0 }
        ]
      }
      margin={{ top: 30, left: 40 }}
      innerRadius={0.7}
      startAngle={270}
      padAngle={2}
      cornerRadius={3}
      enableSlicesLabels={false}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      fitWidth={true}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      fill={[
          {
              match: {
                  id: 'pending'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'negative'
              },
              id: 'lines'
          },
      ]}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 30,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          }
      ]}
    />
)
