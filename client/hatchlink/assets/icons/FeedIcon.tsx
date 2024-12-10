import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const FeedIcon: React.FC<SvgProps> = (props) => (
  <Svg
    width={24} // Default size; adjust as needed
    height={24} // Default size; adjust as needed
    fill="none"
    stroke="currentColor" // Allows dynamic coloring
    strokeLinecap="round" // Valid values: "butt", "round", "square"
    strokeLinejoin="round" // Valid values: "miter", "round", "bevel"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props} // Spread props to allow customization
  >
    <Circle cx={7.5} cy={7.5} r={2.5} />
    <Path d="M22 13H2M18 6h-5m5 3h-5M5 2h14a3 3 0 0 1 3 3v17H2V5a3 3 0 0 1 3-3z" />
  </Svg>
);

export default FeedIcon;
