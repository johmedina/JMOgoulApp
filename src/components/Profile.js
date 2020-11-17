import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class Profile extends React.Component{
    componentDidMount(){
        this.fetchFromAPI();
      };
    
    fetchFromAPI(){
    // posts is an array of objects 

    };

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image}
                    source={{ uri:'https://live.staticflickr.com/65535/50602293952_6f648b9560_o.png' }}
                />

                <Text> Profile Page </Text> 
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 30,
      paddingLeft: 10,
      marginBottom: 200,
    },
  
    image:{
      width: 150,
      height:40 ,
      marginTop: 20,
      marginLeft: (Dimensions.get('window').width)/3.5
    },
  
    inputBoxes: {
      borderBottomWidth: 1,
      borderBottomColor: '#2d0b59',
      paddingBottom: 5,
      fontSize: 16,
      marginBottom: 15,
      marginTop: 50,
      color: '#2d0b59',
      paddingBottom: 30,
    },
  
    button: {
      borderWidth: 2,
      backgroundColor: '#2d0b59',
      width: 120,
      height: 25,
      justifyContent: 'center',
      borderRadius: 50,
      borderColor:'#2d0b59',
      marginLeft: (Dimensions.get('window').width)/1.7
    },
  
    
  });
  

export default Profile;