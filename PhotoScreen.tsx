import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

// keeps saying no photo recived 

export default function PhotoScreen() {
  const router = useRouter();
  const { uri } = useLocalSearchParams<{ uri: string }>();

  // Safety check
  if (!uri) {
    return (
      <View style={styles.center}>
        <Text>No photo received.</Text>
      </View>
    );
  }

   // Go to AddPost screen   
  const goToAddPost = () => {
    router.push({
      pathname: '/(drawer)/screens/AddPost',
      params: { imageUri: uri },
    });
  };

  return (
    <View style={styles.container}>
      {/* Image preview */}
      <Image source={{ uri }} style={styles.image} />

      {/* Add post button */}
      <Button title="Add Post" onPress={goToAddPost } />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faffc9ff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
