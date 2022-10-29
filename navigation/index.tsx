//import navigation
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
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
import { ColorSchemeName } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

//import icon
import Icon from '../components/Icon'

//import types
import { RootStackParamList, RootTabParamList } from '../types';

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
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    const EmptyComponent = () => null;

    return (
        <BottomTab.Navigator
            initialRouteName="Discover"
            backBehavior="history"
            screenOptions={{
                tabBarStyle: { backgroundColor: Colors[colorScheme].background, borderTopWidth: 0 },
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="Discover"
                component={Discover}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarIcon: ({ color }) => <Icon iconPack='MaterialIcons' name="explore" color={color} />,
                }} />
            <BottomTab.Screen
                name="Search"
                component={Search}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarIcon: ({ color }) => <Icon iconPack='Octicons' name="search" color={color} />
                }} />
            <BottomTab.Screen
                name="Chooser"
                component={EmptyComponent}
                options={{
                    headerShown: false,
                    tabBarItemStyle: { backgroundColor: "green", borderRadius: 200, flex: 0.6 },
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarLabel: "",
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: () => <Icon iconPack='Octicons' name="plus" color={Colors[colorScheme].tint} />,
                    tabBarButton: () => <CategoryChooserTab />
                }} />
            <BottomTab.Screen
                name="Lists"
                component={Lists}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarIcon: ({ color }) => <Icon iconPack='Octicons' name="list-unordered" color={color} />
                }} />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarIcon: ({ color }) => <Icon iconPack='Octicons' name="person" color={color} />
                }} />
        </BottomTab.Navigator>
    );
}

