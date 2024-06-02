import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import { Epdetail } from './pages/Epdetail';
import { Characterdetail } from './pages/Characterdetail';
import { Favcharacters } from './pages/Favcharacters';
import { store } from './controller/store';
import { initializeFavorites } from './controller/favoritesSlice';
import { Provider, useDispatch } from 'react-redux';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppInner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

const NavStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ANASAYFA" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="BÖLÜM DETAY" component={Epdetail} />
      <Stack.Screen name="KARAKTER DETAY" component={Characterdetail} />
    </Stack.Navigator>
  );
};
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          // tabBarStyle: { height: height*0.1}, tabBarItemStyle: { width: 120 },  
          tabBarLabelStyle: { fontSize: 16 }
        }}>
        <Tab.Screen name="ANA SAYFA" component={NavStack} options={{ headerShown: false }} />
        <Tab.Screen name="FAV KARAKTERLERİM" component={Favcharacters}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
