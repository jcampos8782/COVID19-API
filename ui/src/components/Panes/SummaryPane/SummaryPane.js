import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ResponsivePie } from '@nivo/pie';

import BadgedIcon from '../../BadgedIcon';
import TabPanel from '../TabPanel';
import TimeSeriesHeatMap from '../../TimeSeriesHeatMap';
import TimeSeriesLineChart from '../../TimeSeriesLineChart';
import RegionOverviewBadges from '../../RegionOverviewBadges';

import { formatDateKey } from '../../../util';

export default class SummaryPane extends React.Component {
  render() {
    const {
      data,
      columns,
      theme,
      value,
      index
    } = this.props;

    let trends = (
      <Grid container>
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
                  obj[date] = data.weeklyRateOfChange[key][idx]
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
            theme={theme}
            title="Last 7 Days"
            data={data.keys.map(series => (
              {
                id: series,
                data: data.recent[series].map((val,idx) => ({
                    x: formatDateKey(columns[columns.length - 7 + idx]),
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
            <RegionOverviewBadges />
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

const Hospitalizations = props => (
  <Grid container style={{paddingBottom: 20}}>
    <Grid item xs={12}>
      <Typography variant="h6">Hospitalizations</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="overline">Current/Cumulative</Typography>
    </Grid>
    <Grid item xs={6} sm={4}>
      <BadgedIcon
        title="Admitted"
        color="error"
        iconClass="fas fa-clinic-medical"
        value="-/-"
        />
    </Grid>
    <Grid item xs={6} sm={4}>
      <BadgedIcon
        title="Intensive Care"
        color="error"
        iconClass="fas fa-procedures"
        value="-/-"
        />
    </Grid>
    <Grid item xs={6} sm={4}>
      <BadgedIcon
        title="Ventiliator"
        color="error"
        iconClass="fas fa-lungs-virus"
        value="-/-"
        />
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
