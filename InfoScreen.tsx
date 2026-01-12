import { Text } from "@react-navigation/elements";
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";

const items = [
        { text: 'This app is for nature lovers who would like to explore natural landmarks. '}
        ];

// for places not currently in use needs moving 
export default function HomeScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <View style={styles.container}>
        <Titlebar />
        <Text style={styles.subtitle}>Landmarks</Text>
      
        <ScrollView>
        </ScrollView>
        </View>
    </View>
  );
}

function Titlebar() {
  return(
    <View style={styles.titlebar}>
      <Image style={styles.avatar} source={{uri:'https://avatarmaker.com/female/'}}/>
      <Text style={styles.title}>Tribal Trails</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        backgroundColor: '#e9edc8ff'
},
    imageContainer : {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
},
    image: {
        width: 200,
        height: 200
},
    content: {
        flex: 3,
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center'
},
    name: {
        color: '#202020ff',
        fontWeight: '600',
        fontSize: 16
},
    description: {
    color: '#252525ff',
    fontSize: 14
},
    titlebar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 80,
        paddingBottom: 10
},
    backButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        marginTop: 70,
        padding: 10
},
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22
},
    title: {
        color: '#d7ddb6ff',
        marginLeft: -50, // sets title to center 
        fontSize: 40 ,
        fontWeight: '600'
},
    subtitle :{
        color: '#000000ff',
        fontSize: 20,
        fontWeight: '500',
        padding: 10
}   
}
);