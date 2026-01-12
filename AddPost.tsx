import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import * as FileSystem from "expo-file-system/legacy";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Alert, Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { db, storage } from "../../firebase"; // <-- your Firestore instance

// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional




type Props = NativeStackScreenProps<any>;

export default function AddPost({ navigation, route }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const { height } = Dimensions.get("window");


    const { imageUri: paramImageUri } = useLocalSearchParams<{ imageUri?: string }>();
    useEffect(() => {
    if (paramImageUri) {
        setImageUri(paramImageUri);
    }
    }, [paramImageUri]);

    type RootStackParamList = {
    AddPost: undefined;
    MainTabs: undefined;
    };

    {imageUri && (
    <Image
        source={{ uri: imageUri }}
        style={{ width: 200, height: 200, marginTop: 12 }}
    />
    )}

    const submitPost = async () => {
    if (!title.trim() || !description.trim() || rating === 0 ||difficulty ===0 || !imageUri){
      Alert.alert("Missing text", "Please compleate all fields");
      return;
    }
    setLoading(true);

    // React.useEffect(() => {
    //    if (route.params?.imageUri) {
    //      setImageUri(route.params.imageUri);
    //    }
    // }, [route.params]);

    try {
      const imageUrl = await uploadImageToStorage(imageUri);
    
      await addDoc(collection(db, "reviews"), {
        title,
        description, 
        rating,
        difficulty,
        imageUrl,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Review added!");
      router.push("/(drawer)/screens/ReviewScreen");
    } catch (error) {
      console.log("Error saving post.", error);
      Alert.alert("Error", JSON.stringify(error)); // "Could not add review");
    }
    setLoading(false);
  };

  
  const renderStars = () => {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text
          key={star}
          style={[
            styles.star,
            { color: star <= rating ? '#FFD700' : '#ccc' },
          ]}
          onPress={() => setRating(star)}
        >
          ★
        </Text>
      ))}
    </View>
  );
  };

  const teraindiff = () => {
  return (
    <View style={styles.terainRow}>
      {[1, 2, 3, 4, 5].map((level) => (
        <Text
          key={level}
          style={[
            styles.difficulty,
            { color: level <= difficulty ? '#535cffff' : '#ccc' },
          ]}
          onPress={() => setDifficulty(level)}
        >
          ▲
        </Text>
      ))}
    </View>
  );
  };

  // ----------------------------
  // Pick Photo From Camera Roll- 
  // remove so has to be mobile 
  // ----------------------------
  // const pickImage = async () => {
  //  let result = await ImagePicker.launchImageLibraryAsync({
  //    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //    quality: 0.7,
  //  });

  //  if (!result.canceled) {
  //    setImageUri(result.assets[0].uri);
  //    console.log("Photo selected:", result.assets[0].uri);
  //  }
  //};


  // ----------------------------------------
  // Upload image to Firebase Storage
  // ----------------------------------------
  const uploadImageToStorage = async (uri: string) => {
    const responce = await fetch(uri);
    const blob = await responce.blob();

    const fileRef = ref(storage, `images/${Date.now()}.jpg`);

    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);

    // Read file as Base64
    //const base64 = await FileSystem.readAsStringAsync(uri, {
    //  encoding: FileSystem.EncodingType.Base64,
    };


  // ----------------------------------------
  // Save Post to Firestore
  // ----------------------------------------

    


  return (  // addpost design
    <ScrollView 
        contentContainerStyle={[styles.container, {minHeight: height}]}
        showsVerticalScrollIndicator = {true}>

        {/*the title*/} 
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
       
       {/*star rating*/} 
       <Text style={styles.label}>Rating</Text>
       <View style={styles.star}>
            {renderStars()}
        </View>

        {/*difficulty  rating*/} 
       <Text style={styles.label}>Terrain Difficulty</Text>
       <View style={styles.difficulty}>
            {teraindiff()}
        </View>

     {/*the review*/} 
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]} onChangeText={setDescription} multiline />

        {/*post*/} 
      <Button 
      title="Post Review" disabled={loading || !imageUri || rating ===0 || difficulty ===0} 
      color="#10447eff"
      onPress = {submitPost} />

        <View style={{ padding: 16 }}>
      {/*Take photo*/} 
      <Button
        title="Take Photo"
        color="#10447eff"
        onPress={() => router.push("/(drawer)/screens/CameraScreen")}
      />

      {/*Show preview if photo exists*/} 
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ height: 250, marginVertical: 12 }}
        />
      )}

      </View>

      
    </ScrollView>
  );
}


// ----------------------------
// Styles
// ----------------------------
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4ffd7ff",
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#002e03ff",
    borderRadius: 6,
    padding: 5,
  },
  starsRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
  terainRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
  star: {
    fontSize: 32,
    marginRight: 6,
  },
  difficulty: {
    fontSize: 32,
    marginRight: 6,
  },
});