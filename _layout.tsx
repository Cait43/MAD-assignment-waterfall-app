import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: '#2b4d17ff',
        },
        drawerLabelStyle: {
          color: '#d7ddb6ff',
          fontSize: 16,
        },
        drawerActiveBackgroundColor: '#4f7a2b',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#cfd8b6',
        headerStyle: {
          backgroundColor: '#2b4d17ff',
        },
        headerTintColor: '#d7ddb6ff',
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        options={{ title: 'Map 🗺️' }}
      />
      <Drawer.Screen
        name="CameraScreen"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="AddPost"
        options={{ title: 'Post 📸' }}
      />
      <Drawer.Screen
        name="InfoScreen"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="ReviewScreen"
        options={{ title: 'Reviews 📝' }}
      />
      <Drawer.Screen
        name="PhotoScreen"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    
    </Drawer>
  );
}