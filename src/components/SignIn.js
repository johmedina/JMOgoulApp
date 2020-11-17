import React from 'react';
import {View,Image,StyleSheet,Text,TouchableOpacity,TextInput,Dimensions,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { Buffer } from 'buffer';


const config = {
  issuer: 'https://dev-9372078.okta.com/oauth2/default',
    clientId: '0oarrphrRf023Q9R35d5',
    redirectUrl: 'com.okta.dev-9372078:/callback',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'phone', 'address'],
};


class SignIn extends React.Component{
  state = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    idToken: ''
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };


  authorize = async () => {
    try {
      console.log('inside authorize')
      const authState = await authorize(config);
      this.setState(
        {
          hasLoggedInOnce: true,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken,
          idToken: authState.idToken
        },
        function(){
          if (this.state.idToken) {
            const jwtBody = this.state.idToken.split('.')[1];
            const base64 = jwtBody.replace('-', '+').replace('_', '/');
            const decodedJwt = Buffer.from(base64, 'base64');
            var parsedIdToken = JSON.parse(decodedJwt);
            console.log('id token:', parsedIdToken)
          }
          this.props.navigation.navigate('Home', {accessToken: this.state.accessToken, idToken:parsedIdToken })
        }
      );
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };



  render(){
    return(
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://live.staticflickr.com/65535/50602293952_6f648b9560_o.png'}}
        />

        <View>
          {!this.state.accessToken && (
            <View>
              <TouchableOpacity style={styles.logInButton} onPress={()=>{this.authorize()}}>
                <Text style={{color:'white', alignSelf:'center'}}>LOG IN / REGISTER</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>

      </View>
        
    )
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent:'center',
    },
  
    image: {
      alignSelf: 'center',
      width: '69%',
      height: '15%',
      resizeMode: 'contain',
      justifyContent: 'center',
    },
  
    logInButton: {
      backgroundColor: '#2d0b59',
      borderWidth: 2,
      width: 200,
      height: 40,
      justifyContent: 'center',
      marginLeft: (Dimensions.get('window').width)/3.8,
      borderRadius: 50,
      borderColor: '#2d0b59'
    },
    
  });

export default SignIn;