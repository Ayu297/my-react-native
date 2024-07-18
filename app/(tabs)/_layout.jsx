import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import COLORS from '../../constants/colors';



const TabLayout = () => {

    function getTabBarIcon(routeName, {color, focused, size}) {
        let name;
        switch(routeName) {
            case 'index':
                name = focused ? "home" : "home-outline"
                break
            case 'product':
                name = focused ? "cart" : "cart-outline"
                break
            case 'profile':
                 name = focused ? "person" : "person-outline"
                 break
        }
        return <Ionicons name={name} size={size} color={color}/>
    
    }
    
           
    return (
        <Tabs
        screenOptions={({route}) => {
            return {
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveIntColor: COLORS.black,
                tabBarIcon: (opt) => getTabBarIcon(route.name, opt)
            }
        }}
    >
        <Tabs.Screen name="index"  />
        <Tabs.Screen name="product"  />
        <Tabs.Screen name="profile" />
    </Tabs>
    )
}

export default TabLayout
