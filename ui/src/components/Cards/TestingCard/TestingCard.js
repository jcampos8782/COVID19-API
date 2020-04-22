import React from 'react';

import { ResponsivePie } from '@nivo/pie';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

export default class LocalCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          title="Testing"
          subheader="California"
          />
        <CardContent>
          <Container style={{height: 150}}>
          <ResponsivePie
              data={
                [
                  { id: "positive", label: "Positive", value: 29000 },
                  { id: "negative", label: "Negative", value: 290000},
                  { id: "pending", label: "Pending", value: 0 }
                ]
              }
              margin={{ top: 30, left: 40}}
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
          </Container>
        </CardContent>
      </Card>
    )
  }
}
