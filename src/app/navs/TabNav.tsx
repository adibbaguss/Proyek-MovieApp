import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteStackNav from './FavoriteStackNav';
import HomeStackNav from './HomeStackNav';
import SearchStackNav from './SearchStackNav';
export default function TabNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNav}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNav}
        options={{
          tabBarIcon: ({ color }) => <Feather name="search" size={28} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStackNav}
        options={{
          tabBarIcon: ({ color }) => <Feather name="heart" size={28} color={color} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
