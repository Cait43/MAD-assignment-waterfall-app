import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { db } from "../../firebase";

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reviews"), (snapshot) => {
      setReviews(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsub;
  }, []);

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{ height: 150, borderRadius: 8 }}
          />

          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 8 }}>
            {item.title}
          </Text>

          <Text style={{ marginTop: 4 }}>
            {item.description}
          </Text>

          <Text style={{ marginTop: 4 }}>
            ★ {item.rating} | ▲ {item.difficulty}
          </Text>
        </View>
      )}
    />
  );
}
