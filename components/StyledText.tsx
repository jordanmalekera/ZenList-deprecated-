import { Text, TextProps } from './Themed';

export function OpenSansText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'open-sans' }]} />;
}
