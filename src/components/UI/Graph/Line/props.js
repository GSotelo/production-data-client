const CustomSymbol = ({ size, borderWidth, borderColor }) => (
  <g>
    <circle
      fill="#fff"
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
  </g>
);

export const axisBottom = {
  format: '%b %d',
  legendOffset: 20,
  legendPosition: 'middle',
  tickPadding: 500,
};

export const axisLeft = {
  legendOffset: -43,
  legendPosition: 'middle',
};

export const general = {
  curve: "catmullRom",
  enableCrosshair: false,
  enablePoints: true,
  margin: {
    top: 50,
    right: 4,
    bottom: 30,
    left: 60
  },
  pointBorderColor: { from: 'color', modifiers: [] },
  pointBorderWidth: 2,
  pointSize: 6,
  pointSymbol: CustomSymbol,
  xFormat: "time:%Y/%m/%d",
  xScale: {
    format: '%Y-%m-%d',
    precision: 'day',
    type: 'time',
    useUTC: true
  },
  yScale: {
    type: 'linear',
    stacked: false,
  },
  useMesh: true
};

export const legends =
{
  anchor: 'top',
  direction: 'row',
  effects: [
    {
      on: 'hover',
      style: {
        itemTextColor: "#0071be"
      }
    }
  ],
  itemDirection: 'left-to-right',
  itemHeight: 0,
  itemOpacity: 0.9,
  itemsSpacing: 80,
  itemWidth: 0,
  justify: false,
  translateX: 0,
  translateY: -30,
  symbolShape: 'square',
  symbolSize: 12,
};

export const theme = {
  axis: {
    legend: {
      text: {
        fontSize: 16,
        fontWeight: "bold"
      },
    },
  },
  fontSize: 13,
  textColor: "#777777",
  tooltip: {
    container: {
      background: "#333",
      color: "#fff"
    }
  }
};