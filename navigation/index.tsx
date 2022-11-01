//import navigation
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinkingConfiguration from './LinkingConfiguration';

//import screens and components
import Discover from '../screens/Discover';
import Search from '../screens/Search';
import Lists from '../screens/Lists';
import Profile from '../screens/Profile';
import CategoryChooserTab from '../components/CategoryChooserTab';

//import app theme colors
import { Alert, BackHandler, ColorSchemeName, DynamicColorIOS, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

//import icon
import { FontAwesomeIcon, } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faSearch, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons'

//import types
import { RootStackParamList, RootTabParamList } from '../types/navigationTypes';
import Intro from '../screens/login/Intro';
import Login from '../screens/login/Login';
import { useEffect } from 'react';

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
        <Stack.Navigator
            initialRouteName="Login"
            
        >
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{
                headerTitle: '',
                headerStyle: { backgroundColor: Colors[colorScheme].background },
                headerShadowVisible: false,
                headerBackButtonMenuEnabled: false,

                headerLeft: () => <EmptyComponent />
            }} />
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

export function BottomTabNavigator({navigation}: any) {
    const colorScheme = useColorScheme();
    const EmptyComponent = () => null;
    library.add(faHouse, faSearch, faList, faUser)
    
    useEffect(
        () =>
        navigation.addListener('beforeRemove', (e:any) => {
            e.preventDefault();

            Alert.alert('Exit',
                'Do you want to exit the app?',
                [
                  { text: "Don't exit", style: 'cancel', onPress: () => {} },
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

    return (
        <BottomTab.Navigator
            initialRouteName="Discover"
            backBehavior="history"
            screenOptions={{
                headerTitleStyle: { fontFamily: 'open-sans', fontSize: 34, fontWeight: 'bold' },
                headerStyle: { backgroundColor: Colors[colorScheme].background },
                headerShadowVisible: false,
                tabBarStyle: { backgroundColor: Colors[colorScheme].background, borderTopWidth: 0, shadowColor: '' },
                tabBarLabelStyle: { display: 'none' },
                tabBarActiveTintColor: Colors[colorScheme].tint
            }}>
            <BottomTab.Screen
                name="Discover"
                component={Discover}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon='house' color={color} size={24}/>,
                }} />
            <BottomTab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon="search" color={color} size={24} />
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
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon="list" color={color} size={24} />
                }} />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon="user" color={color} size={24} />
                }} />
        </BottomTab.Navigator>
    );
}