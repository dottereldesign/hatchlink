import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const HomeIcon: React.FC<SvgProps> = (props) => (
  <Svg
    width={24} // Default width
    height={24} // Default height
    fill="none"
    stroke="currentColor" // Default stroke color for dynamic theme
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 192 192"
    {...props} // Spread props to allow customization
  >
    <Path
      d="M41.733 160.134v-59.2H21.999L96 31.865l74 69.067h-19.733v59.201H110.8v-44.4H81.2v44.4z"
      fill="none" // Removed style object and replaced with direct attributes
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeIcon;
