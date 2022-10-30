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
import { Ionicons, Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

//import types
import { RootStackParamList, RootTabParamList } from '../types/navigationTypes';
import Intro from '../screens/login/Intro';
import Login from '../screens/login/Login';

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
        <Stack.Navigator
        initialRouteName="Intro"
        >
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

export function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    const EmptyComponent = () => null;

    return (
        <BottomTab.Navigator
            initialRouteName="Discover"
            backBehavior="history"
            screenOptions={{
                tabBarStyle: { backgroundColor: Colors[colorScheme].background, borderTopWidth: 0, },
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="Discover"
                component={Discover}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color }) => <TabBarIconMat name="explore" color={color} />,
                }} />
            <BottomTab.Screen
                name="Search"
                component={Search}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />
                }} />
            <BottomTab.Screen
                name="Chooser"
                component={EmptyComponent}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarLabelStyle: { display: 'none' },
                    tabBarItemStyle: {marginVertical: 40},
                    tabBarButton: () => <CategoryChooserTab />
                }} />
            <BottomTab.Screen
                name="Lists"
                component={Lists}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color }) => <TabBarIcon name="list-unordered" color={color} />
                }} />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />
                }} />
        </BottomTab.Navigator>
    );
}

/**
 * built-in icon families and icons
 * https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof Octicons>['name'];
    color: string;
}) {
    return <Octicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconMat(props: {
    name: React.ComponentProps<typeof MaterialIcons>['name'];
    color: string;
}) {
    return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconIon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

