import { Text } from "@react-navigation/elements";
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Landmarks from '../components/Landmarks';


// keep this 
const items = [
  // need to work on importing the images 
  { text: 'Niagara Falls', 
  image: ' https://d2eh9r2dxlfjaa.cloudfront.net/resize=width:1920/no_metadata/quality=value:33/compress/https://greatlakesguide.blob.core.windows.net/images/a2P0B00000ApyY4UAJ.jpeg', 
  description: 'Niagara Falls is one of North America’s most iconic spectacles, beloved for its beauty and uniqueness. The name refers to three individual waterfalls: the Horseshoe Falls (also known as the Canadian Falls), the American Falls, and the smaller Bridal Veil Falls. They are located on the Niagara River, and lie on the border between Ontario, Canada and the American state of New York.', 
  characteristics: {Location: 'North America', difficulty: 4, cost: 3, visualappeal: 7}}, 

  // add at least 8 more 
];
//

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
        { // indicating what is next is JS and not XML
          items.map((place, homeScreen) => (
            <TouchableOpacity key={homeScreen} onPress={() => props.navigation.navigate('Info' ,place)}>
            <Landmarks name={place.text} source={place.image}
              description={place.description} />
            </TouchableOpacity>
          ))
        }
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
        backgroundColor: '#d7dd9fff'
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