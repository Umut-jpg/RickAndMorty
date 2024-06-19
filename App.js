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
import { Image,StatusBar} from 'react-native';

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
      <Stack.Screen name="BÖLÜM DETAY" component={Epdetail}   options={{
          headerTitle: 'Bölüm Detayları',
          headerStyle: { backgroundColor: 'lightblue' },  
        }}/>
      <Stack.Screen name="KARAKTER DETAY" component={Characterdetail} options={{
          headerTitle: 'Karakter Detayları',
          
          headerStyle: { backgroundColor: 'lightblue' },  
        }}/>
         
    </Stack.Navigator>
  );
};
  return (
    
    <NavigationContainer>
         
      <Tab.Navigator 
       
        screenOptions={{
          // tabBarStyle: { height: height*0.1}, tabBarItemStyle: { width: 120 },  
          tabBarLabelStyle: { fontSize: 9 },
          tabBarStyle: { backgroundColor: 'lightblue' },
        
        }}>
        <Tab.Screen name="ANA SAYFA" component={NavStack} options=
        {{ headerShown: false ,
          tabBarIcon: ({ color,  }) => (
            <Image
              source={require('./assets/home.png')}
              style={{ width: 15, height: 20, tintColor: color }}
            />
          ),

          
        }} 
        />
        <Tab.Screen name="Favorilerim" component={Favcharacters} 
          options={{
            headerTitle: 'Favori Karakterlerim',
          
            headerStyle: { backgroundColor: 'lightblue' },  
            tabBarIcon: ({  color }) => (
              <Image
                source={require('./assets/fav.png')}
                style={{ width: 15, height: 20, tintColor: color }}
              />
            ),
          }}/>
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
