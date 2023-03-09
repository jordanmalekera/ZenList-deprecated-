//import navigation
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinkingConfiguration from './LinkingConfiguration';

//import screens and components
import Discover from '../screens/Home';
import Search from '../screens/Search';
import Lists from '../screens/Lists';
import Profile from '../screens/Profile';
import CategoryChooserTab from '../components/CategoryChooserTab';

//import app theme colors
import { Alert, BackHandler, ColorSchemeName, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

//import icon

import { AntDesign } from '@expo/vector-icons'; 

//import types
import { RootStackParamList, RootTabParamList } from '../types/navigationTypes';
import Intro from '../screens/login/Intro';
import Login from '../screens/login/Login';
import { useEffect } from 'react';
import Details from '../screens/Details';

/**  
 * app navigation container that manages our navigation tree
 */

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const colorScheme = useColorScheme();
    const EmptyComponent = () => null;
    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Group screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 20 }}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator({ navigation }: any) {
    const colorScheme = useColorScheme();
    const EmptyComponent = () => null;
    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e: any) => {
                e.preventDefault();

                Alert.alert('Exit',
                    'Do you want to exit the app?',
                    [
                        { text: "Don't exit", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Exit',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => BackHandler.exitApp()
                        },
                    ]
                );
            }))

    function SettingsBtn({ btnColor }: any) {
        return (
            <TouchableOpacity>
                <AntDesign icon="gear" color={btnColor} size={20} />
            </TouchableOpacity>
        )
    }

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            backBehavior="history"
            screenOptions={{
                headerTitleStyle: { fontFamily: 'open-sans', fontSize: 22, fontWeight: 'bold' },
                headerStyle: { backgroundColor: Colors[colorScheme].background },
                headerRightContainerStyle: { paddingRight: '10%' },
                headerLeftContainerStyle: { paddingLeft: '8%' },
                headerTitleAlign: 'center',
                headerRight: () => <AntDesign name="setting" size={24} color={Colors[colorScheme].text} />,
                headerShadowVisible: false,
                tabBarStyle: { backgroundColor: Colors[colorScheme].background, borderTopWidth: 0, shadowColor: 'transparent' },
                tabBarLabelStyle: { display: 'none' },
                tabBarActiveTintColor: Colors[colorScheme].tint
            }}>
            <BottomTab.Screen
                name="Home"
                component={Discover}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
                }} />
            <BottomTab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
                }} />
            <BottomTab.Screen
                name="Chooser"
                component={EmptyComponent}
                options={{
                    headerShown: false,
                    tabBarItemStyle: { marginVertical: 40 },
                    tabBarButton: () => <CategoryChooserTab />
                }} />
            <BottomTab.Screen
                name="Lists"
                component={Lists}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="bars" size={24} color={color} />
                }} />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
                }} />
            <BottomTab.Group screenOptions={{tabBarItemStyle: { display: 'none' }}}>
                <BottomTab.Screen name="Details" component={Details} options={{unmountOnBlur: true, headerTitle: '',  }} />
            </BottomTab.Group>
        </BottomTab.Navigator>
    );
}