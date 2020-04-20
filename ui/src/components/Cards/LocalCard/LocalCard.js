import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { ResponsivePie } from '@nivo/pie';

export default class LocalCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          title="California"
          />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="caption">Population</Typography>
                </Grid>
                <Grid item xs={4} sm={2} lg={4}>
                  <Icon color="primary" style={{paddingRight: 10}} className={`${classes.icon} fas fa-users`}/>
                </Grid>
                <Grid item xs={8} sm={10} lg={8}>
                  <Typography variant="button">39,000,000</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="caption">Recovered</Typography>
                </Grid>
                <Grid item xs={4} sm={2} lg={4}>
                  <Icon style={{paddingRight: 10}} className={`${classes.icon} ${classes.green} fas fa-heartbeat`}/>
                </Grid>
                <Grid item xs={8} sm={10} lg={8}>
                  <Typography variant="button">12,000</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="caption">Confirmed</Typography>
                </Grid>
                <Grid item xs={4} sm={2} lg={4}>
                  <Icon color="secondary" style={{paddingRight: 10}} className={`${classes.icon} fas fa-head-side-cough`}/>
                </Grid>
                <Grid item xs={8} sm={10} lg={8}>
                  <Typography variant="button">26,000 (.06%)</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="caption">Hospitalized</Typography>
                </Grid>
                <Grid item xs={4} sm={2} lg={4}>
                  <Icon color="error" style={{paddingRight: 10}} className={`${classes.icon} fas fa-clinic-medical`}/>
                </Grid>
                <Grid item xs={8} sm={10} lg={8}>
                  <Typography variant="button">3,000 (&lt; .01%)</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="caption">Intensive Care</Typography>
                </Grid>
                <Grid item xs={4} sm={2} lg={4}>
                  <Icon color="error" style={{paddingRight: 10}} className={`${classes.icon} fas fa-procedures`}/>
                </Grid>
                <Grid item xs={8} sm={10} lg={8}>
                  <Typography variant="button">120 (&lt; .01%)</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="caption">Ventilator</Typography>
                </Grid>
                <Grid item xs={4} sm={2} lg={4}>
                  <Icon color="error" style={{paddingRight: 10}} className={`${classes.icon} fas fa-lungs-virus`}/>
                </Grid>
                <Grid item xs={8} sm={10} lg={8}>
                  <Typography variant="button">120 (&lt; .01%)</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{marginTop: 20, marginBottom:20}} light />
          <Grid item xs={12}>
            <Typography variant="overline">Tests Administered</Typography>
          </Grid>
          <Grid item xs={12} style={{height: 150}}>
            <ResponsivePie
                data={
                  [
                    { id: "positive", label: "Positive", value: 27528 },
                    { id: "negative", label: "Negative", value: 39000},
                    { id: "pending", label: "Pending", value: 7200 }
                  ]
                }
        margin={{ top: 10, right: 30 }}
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
                        anchor: 'top-right',
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
          </Grid>
        </CardContent>
      </Card>
    )
  }
}
