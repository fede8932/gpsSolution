import React from 'react';
import {Box, Spinner, Heading} from 'native-base';

export const Loading = props => {
  return (
    <Box display={'flex'} flexDirection={'row'}>
      <Spinner color={props.color} accessibilityLabel="Loading posts" />
      {props.text ? (
        <Heading color={props.color} fontSize="md">
          Loading
        </Heading>
      ) : (
        <></>
      )}
    </Box>
  );
};
