import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StackParamList } from './src/types/StackParamList';

import Homepage from './src/components/Homepage/Homepage';
import MoviePage from './src/components/MoviePage/MoviePage';

import configurationContext from './src/contexts/configuration/configuration';

import { getConfiguration, IConfiguration } from './src/services/configuration/configuration';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  const [configuration, setConfiguration] = useState<Partial<IConfiguration>>({});

  useEffect(() => {
    getConfiguration().then(data => setConfiguration(data));
  }, []);

  return (
    <configurationContext.Provider value={configuration}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Home">
          <Stack.Screen name="Home" component={Homepage} options={{ title: 'Homepage' }} />
          <Stack.Screen name="Movie" component={MoviePage} options={{ title: 'Movie' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </configurationContext.Provider>
  );
}
