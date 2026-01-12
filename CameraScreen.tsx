import Slider from '@react-native-community/slider';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Directory, File, Paths } from 'expo-file-system';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Pressable, Text, View } from 'react-native';


// use this to add a camera to the app 

export const PHOTOS_DIR = new Directory(Paths.document, 'MAD_Photos');

export default function CameraScreen(props: any) {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoURI, setPhotoURI] = useState('');
  const [zoom, setZoom] = useState(0);
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const router = useRouter();



  // Request camera permission + create directory on first render
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }

    // create directory once
    try {
      if (!PHOTOS_DIR.exists) {
        PHOTOS_DIR.create();
      }
    } catch (error: any) {
      Alert.alert('Could not create Directory', error.message ?? 'Unknown error');
    }
  }, [permission]);

  // Permission not yet available
  if (!permission) {
    return <Text>Checking permissions...</Text>;
  }

  // Permission denied
  if (!permission.granted) {
    return <Text>Camera permission denied.</Text>;
  }

  // If screen not focused → stop camera
  if (!isFocused) {
    return <View style={{ flex: 1 }} />;
  }

  const takePhoto = async () => {
  try {
    const photo = await cameraRef.current?.takePictureAsync();

    if (!photo?.uri) {
      Alert.alert('No Photo', 'Could not capture the photo.');
      return;
    }

    const fileName = 'photo_' + Date.now() + '.jpg';
    const file = new File(PHOTOS_DIR, fileName);
    const sourceFile = new File(photo.uri);

    // Move temp → permanent
    sourceFile.move(file);

    console.log("Photo saved:", file.uri);

    // Use the permanent file URI
    router.push({
        pathname: "/(drawer)/screens/PhotoScreen",
        params: { uri: file.uri },
    });
    // props.navigation.navigate("AddPost", { imageUri: file.uri });

  } catch (error: any) {
    console.log("Move error:", error);
    Alert.alert('Photo failed', 'Could not capture or store the photo.');
  }
};

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={ facing }
        ref={cameraRef}
        zoom={zoom}
      />
      <View style={styles.overlay}>

        <View style={styles.topRight}>
            <Button
                title="Flip Camera"
                onPress={() =>
                    setFacing((current) => (current === 'back' ? 'front' : 'back'))
                }
            />
        </View>

      <View style={styles.zoomContainer}></View>  
        <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={zoom}
            onValueChange={setZoom}
            minimumTrackTintColor="#ffffff"
            maximumTrackTintColor="#999999"
        />
      </View>
    
      <View style={styles.captureContainer}>
        <Pressable
            style={styles.captureButtonOuter}
            onPress={takePhoto}
        >
            <View style={styles.captureButtonInner} />
        </Pressable>
        <Text style={{ color: 'white', marginTop: 6 }}>Take Photo</Text>
      </View>

    </View>
  );
}

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  /* Flip camera button */
  topRight: {
    position: 'absolute',
    top: 40,
    right: 20,
  },

  /* Zoom slider */
  zoomContainer: {
    position: 'absolute',
    left: 15,
    top: '35%',
    height: 250,
    justifyContent: 'center',
  },

  zoomSlider: {
    width: 250,
    height: 40,
    transform: [{ rotate: '-180deg' }], // makes it horisontal
  },

  /* Capture button */
  captureContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },

  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
};
