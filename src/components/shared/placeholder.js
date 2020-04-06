import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components'
import { compose, layout, space } from 'styled-system'

const Placeholder = styled(ShimmerPlaceHolder)(
  compose(
    layout,
    space,
  ),
)

Placeholder.defaultProps = {
  height: 16,
  width: 120,
}

export default Placeholder
