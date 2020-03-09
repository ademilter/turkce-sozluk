import {Button} from 'react-native';
import * as React from 'react';

import BoxCenter from '../components/box-center';
import Box from '../components/box';
import {Bookmark, Send} from '../components/icons';

function SearchView({navigation}) {
  return (
    <BoxCenter>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail')}
      />
      <Box size={20} bg="blue" mt={20} />
      <Bookmark />
      <Send />
    </BoxCenter>
  );
}

export default SearchView;
