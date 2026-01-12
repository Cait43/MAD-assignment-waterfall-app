import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { useLocation } from '../../../hooks/useLocation';



// the map 
export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const userLocation = useLocation();// for user location 
  const [selectedDestination, setSelectedDestination] = React.useState<{
  latitude: number;
  longitude: number;
} | null>(null);

  useEffect(() => {
          if (!userLocation || !mapRef.current) return;
            mapRef.current.animateToRegion({
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.05,  // controlls zoom 
              longitudeDelta: 0.05,
            });
        }, [userLocation]);

  return (
    <View style={styles.box}>
      <Titlebar />
      <MapView
        ref={mapRef}  // trial 
        style={styles.map}
        mapType="none"   // disables Google/Apple maps
        
        // where the map starts  00 so map renders
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
      >
        <UrlTile
          urlTemplate="https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
          maximumZ={19}
        />

        <Marker
          coordinate={{ latitude: 43.0896, longitude: -79.0849 }}
          title="Niagra Falls"
          onPress={() =>
            setSelectedDestination({
              latitude: 43.0896,
              longitude: -79.0849,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 17.9255, longitude: 25.8585 }}
          title="Victoria Falls"
          onPress={() =>
            setSelectedDestination({
              latitude: 17.9255,
              longitude: 25.8585,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 25.6953, longitude: 54.4367 }}
          title="Iguazú Falls"
          onPress={() =>
            setSelectedDestination({
              latitude: 25.6953,
              longitude: 54.4367,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 64.3271, longitude: -20.1199 }}
          title="Gullfoss"
          onPress={() =>
            setSelectedDestination({
              latitude: 64.3271,
              longitude: -20.1199,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 44.9025, longitude: 15.6084 }}
          title="Veliki Slap"
          onPress={() =>
            setSelectedDestination({
              latitude: 44.9025,
              longitude: 15.6084,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 50.7477, longitude: 0.1898 }}
          title="Seven Sisters Country Park"
          onPress={() =>
            setSelectedDestination({
              latitude: 50.7477,
              longitude: 0.1898,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 53.342094, longitude: -1.802244 }}
          title="Winnats Pass"
          onPress={() =>
            setSelectedDestination({
              latitude: 53.342094,
              longitude: -1.802244,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 50.62129104556518, longitude: -2.2768497567499426 }}
          title="Durdle Door" // wrong 
          onPress={() =>
            setSelectedDestination({
              latitude: 50.62129104556518,
              longitude: -2.2768497567499426,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 51.3891, longitude: 1.4348 }}
          title="Botany Bay"
          onPress={() =>
            setSelectedDestination({
              latitude: 51.3891,
              longitude: 1.4348,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 54.65031, longitude: -2.18765 }}
          title="High Force Waterfall" 
          onPress={() =>
            setSelectedDestination({
              latitude: 54.65031,
              longitude: -2.18765,
            })
          }
        />
        <Marker
          coordinate={{ latitude: 54.11709, longitude: -0.07698 }}
          title="Flamborough Head" 
          onPress={() =>
            setSelectedDestination({
              latitude: 54.11709,
              longitude: -0.07698,
            })
          }
        />

        {userLocation && selectedDestination && (
          <Polyline
          coordinates={[
          userLocation, // gets users location 
          selectedDestination,  // gets location of marker selected 
          ]}
          strokeWidth={4}
        />)}


      </MapView>

      
    </View>
  )
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
    backgroundColor: '#e0dfa8ff',
  },
  titlebar: {
    justifyContent: 'center',
    width:"100%",
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#2b4d17ff'
    // add the style properties of the title bar here 
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
  },
  attribution: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
},
  attributionText: {
    fontSize: 10,
},

  // styling for map 
  box: {flex: 1,},
  map: {flex: 1},
});