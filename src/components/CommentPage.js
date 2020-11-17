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
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


class CommentPage extends React.Component{
  state = {
    comments: [],
    isFetching: false,
    post:{},
    newComment: '',
    accessToken: '',
    idToken: {},
  };

  componentDidMount(){
    let post = this.props.navigation.getParam('post')
    let at = this.props.navigation.getParam('accessToken')
    let idt = this.props.navigation.getParam('idToken')
    this.setState({post: post, accessToken: at, idToken: idt})
    this.fetchFromAPI();
  };

  // fetch comments from the API
  fetchFromAPI(){
    fetch('https://jsonplaceholder.typicode.com/comments', {
      headers: {
        'Authorization': `Bearer ${this.state.accessToken}`
      },
    })
      .then(response => response.json())
      .then(json => this.setState({comments: json},))
  };

  // display the names of the commenters and their comments
  renderItem = ({item, index}) => {
    return (
        <View style={{borderBottomColor:'black', borderBottomWidth:1, paddingVertical:5}}>
            <Text style={{fontWeight: 'bold'}}>{item.email}</Text>
            <Text>{item.body}</Text>
        </View>
    );
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  onRefresh() {
    this.setState({isFetching: true,},() => {this.fetchFromAPI();});
  };

  postComment(){
    fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify({
          body: this.state.newComment,
          email: this.state.idToken.email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${this.state.accessToken}`
        },
      })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            this.setState({newComment: '', comments:[json, ...this.state.comments]})
        })
  }


  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.image}
            source={{ uri:'https://live.staticflickr.com/65535/50602293952_6f648b9560_o.png' }}
          />

        <ScrollView style={{margin:15}}> 
            <View style={{backgroundColor:'#2d0b59'}}>
                <Text style={[styles.post, {fontWeight:'bold'}]}>{this.state.post.title}</Text>

                <Text style={styles.post}>{this.state.post.body}</Text>

            </View>
            <Text style={styles.title}>COMMENTS</Text>

            <View style={{flexDirection:'row'}}>
                <TextInput
                    placeholder="Add a comment"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.inputBoxes, {fontStyle: 'italic'}]}
                    value={this.state.newComment}
                    onChangeText={val => this.updateInputVal(val, 'newComment')}
                    multiline={true}
                    numberOfLines={2}
                />
                <TouchableOpacity onPress={()=>this.postComment()}> 
                    <Ionicons name='send' size={15} color='#2d0b59'/>
                </TouchableOpacity>
            </View>
            

            {/* render the comments in a flatlist */}
            <FlatList
            data={this.state.comments}
            renderItem={this.renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
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

    title: {
        fontWeight: 'bold',
        color:'#2d0b59',
        fontSize: 18,
        marginTop: 15, 
        marginBottom: 15,
    },

    body:{
        color:'#2d0b59',
        marginBottom: 15,
    },

    post:{
        color: 'white',
        padding: 10
    },

    inputBoxes: {
        borderBottomWidth: 1,
        borderBottomColor: '#2d0b59',
        paddingBottom: 5,
        fontSize: 16,
        marginBottom: 15,
        color: '#2d0b59',
        width:'90%'
      },
  
});

export default CommentPage;