import { Image, StyleSheet, Text, View } from 'react-native';


export default function Landmarks(props) {
    return (
        <View style={styles.container}>
        <Image style={styles.image} source={{uri: props.source}} />
        <Text style={styles.name}>{props.name}</Text></View>
    );
}

const styles = StyleSheet.create({
container: {
flexDirection: 'row',
paddingBottom: 10,
paddingTop: 10,
alignItems: 'center'
},
name: {
color: '#000000ff',
fontSize: 16,
fontWeight: '300',
marginLeft: 15
},
image: {
    width: 100,
    height: 100
  }
});