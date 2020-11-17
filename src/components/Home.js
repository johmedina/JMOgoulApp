import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';

import Posts from './Posts';

class Home extends React.Component{
  state = {
    posts: [],
    isFetching: false,
    newPost: '',
    newPostTitle: '',
    accessToken: '', 
    idToken: {},
  };

  // when the page mounts, fetch the posts from the API with the access token
  componentDidMount(){
    this.setState({
      accessToken: this.props.navigation.getParam('accessToken'),
      idToken: this.props.navigation.getParam('idToken'),
    })
    this.fetchFromAPI();
  };

  fetchFromAPI(){
    // posts is an array of objects 
    fetch('https://jsonplaceholder.typicode.com/posts', {
      'Authorization': `Bearer ${this.state.accessToken}`
    })
      .then(response => response.json())
      .then(json => {this.setState({posts: json})})
  };

  // render function for the flatlist of posts which calls the component Posts
  renderItem = ({item, index}) => {
    return (
      <Posts 
        item={item} 
        accessToken={this.state.accessToken} 
        idToken={this.state.idToken} 
        navigation={this.props.navigation}
      />
    );
  };

  // function for pull to refresh
  onRefresh() {
    this.setState({isFetching: true,},() => {this.fetchFromAPI();});
  };

  // function for updating value on text input for a new post
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  // function that calls the API to fetch posts
  // userId to be used is assumed to be the key sub from the tokenId just for uniqueness
  uploadPost = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: this.state.newPostTitle,
          body: this.state.newPost,
          userId: this.state.idToken.sub,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${this.state.accessToken}`

        },
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({
          posts:[json, ...this.state.posts], 
          newPost: '', 
          newPostTitle:''})
      })
  }

  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.image}
            source={{ uri:'https://live.staticflickr.com/65535/50602293952_6f648b9560_o.png' }}
          />

        <ScrollView style={{margin:15}}> 
          <Text style={styles.greeting}>Welcome {this.state.idToken.name}!</Text> 
          <TextInput
              placeholder="Title"
              style={[styles.inputBoxes, {fontStyle: 'italic', borderBottomWidth:0, marginBottom:5, }]}
              value={this.state.newPostTitle}
              onChangeText={val => this.updateInputVal(val, 'newPostTitle')}
          />
          <TextInput
              placeholder="What's on your mind"
              autoCapitalize="none"
              autoCorrect={false}
              style={[styles.inputBoxes, {fontStyle: 'italic'}]}
              value={this.state.newPost}
              onChangeText={val => this.updateInputVal(val, 'newPost')}
              multiline={true}
              numberOfLines={2}
          />

          <TouchableOpacity style={styles.button} onPress={()=>this.uploadPost()}> 
              <Text style={{color: 'white', alignSelf: 'center'}}>POST</Text>
          </TouchableOpacity>

          {/* render the posts in a flatlist */}
          <FlatList
            data={this.state.posts}
            renderItem={this.renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        
        
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
  },

  image:{
    width: 150,
    height:40 ,
    marginTop: 20,
    marginLeft: (Dimensions.get('window').width)/3.5
  },

  greeting: {
    color: '#2d0b59',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom:10
  },

  inputBoxes: {
    borderBottomWidth: 1,
    borderBottomColor: '#2d0b59',
    paddingBottom: 5,
    fontSize: 16,
    marginBottom: 15,
    color: '#2d0b59',
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

export default Home;