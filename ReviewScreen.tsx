import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function InfoScreen(props) { 
    // leave props as is its giving an error because its typescript but the code will still run 
    return (
        <View style={styles.container}>
            <View style={styles.titlebar}>
                <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="chevron-back-outline" size={24} onPress={() => props.navigation.navigate('Home')}
                          color="#000000ff" />
                </TouchableOpacity>
                <Text
                    style={styles.name}>{props.route.params.text}
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:
                    props.route.params.image}} />
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>
                    {props.route.params.description}
                </Text>
            </View>
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
        
}
});