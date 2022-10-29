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
import DataChooserModal from '../components/DataChooserModal';

//import app theme colors
import { ColorSchemeName } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

//import icon
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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

export function BottomTabNavigator(props: any) {
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
                options={({ route, navigation }) => ({
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarIcon: ({ color }) => <TabBarIconMat name="explore" color={color} />,
                })} />
            <BottomTab.Screen
                name="Search"
                component={Search}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />
                }} />
            <BottomTab.Screen
                name="Chooser"
                component={EmptyComponent}
                options={({ navigation }) => ({
                    headerShown: false,
                    tabBarItemStyle: { backgroundColor: "green", borderRadius: 200, flex: 0.6 },
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarLabel: "",
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: () => <TabBarIcon name="plus" color={Colors[colorScheme].tint} />,
                    tabBarButton: () => <DataChooserModal />
                })} />
            <BottomTab.Screen
                name="Lists"
                component={Lists}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
                    tabBarIcon: ({ color }) => <TabBarIcon name="list-unordered" color={color} />
                }} />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerStyle: { backgroundColor: Colors[colorScheme].background },
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

