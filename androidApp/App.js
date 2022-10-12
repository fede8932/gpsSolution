/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from './src/states/store';
import {NavigationContainer} from '@react-navigation/native';
import {AplicationTab} from './src/navigation/AplicationTab';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <AplicationTab />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
