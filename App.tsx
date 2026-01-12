import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomeScreen from './(drawer)/screens/HomeScreen';
import InfoScreen from './(drawer)/screens/InfoScreen';


export default function App() {
    const Stack = createStackNavigator();
    return (
    <NavigationIndependentTree>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
}}
>
                <Stack.Screen name="Home"
                    component={HomeScreen}></Stack.Screen>
                    <Stack.Screen name="Info"
component={InfoScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    </NavigationIndependentTree>
);
}