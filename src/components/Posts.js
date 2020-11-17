import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';

class Posts extends React.Component {
  static propTypes= {
    item: PropTypes.object.isRequired,
    accessToken: PropTypes.string.isRequired,
    idToken: PropTypes.object.isRequired,
  };

  state = {
    toEdit: false,
    title: this.props.item.title,
    body: this.props.item.body,
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  // function that calls the API to delete a post
  deletePost = () => {
    let post = this.props.item 
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.props.accessToken}`
        },
    })
    .then(console.log('delete successful'))
  };

  // function to edit a post 
  editPost = () => {
    let post = this.props.item 
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: this.state.title,
          body: this.state.body
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${this.props.accessToken}`
        },
      })
        .then((response) => response.json())
        .then((json) => {
            console.log('edit successful',json)
            this.setState({
                toEdit: false,
            })
        })
      
  }


  render(){
    let post = this.props.item 
    return(
        <View>
            {this.state.toEdit == false && (
                <View style={styles.container}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    </View>
                    <Text style={styles.body}>{this.state.body}</Text>

                    <View style={{flexDirection:'row'}}>

                        <TouchableOpacity 
                          style={styles.button} 
                          onPress={()=>this.props.navigation.navigate('CommentPage', 
                            {post:post, accessToken:this.props.accessToken, idToken: this.props.idToken})}
                        > 
                            <Text style={{alignSelf: 'center', color:'#2d0b59'}}>COMMENTS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={()=>this.setState({toEdit: true})}> 
                            <Text style={{alignSelf: 'center', color:'#2d0b59'}}>EDIT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={()=>this.deletePost()}> 
                            <Text style={{alignSelf: 'center', color:'#2d0b59'}}>DELETE</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )}

            {this.state.toEdit == true && (
                <View style={styles.container}>
                  <TextInput
                      placeholder="Title"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[styles.inputBoxes, {fontStyle: 'italic'}]}
                      value={this.state.title}
                      onChangeText={val => this.updateInputVal(val, 'title')}
                      multiline={true}
                      numberOfLines={2}
                  />
                  <TextInput
                      placeholder="Body"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[styles.inputBoxes, {fontStyle: 'italic'}]}
                      value={this.state.body}
                      onChangeText={val => this.updateInputVal(val, 'body')}
                      multiline={true}
                      numberOfLines={4}
                  />

                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.button, {backgroundColor:'#2d0b59' }]} onPress={()=>this.editPost()}>
                        <Text style={{alignSelf: 'center', color:'white'}}> SAVE </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button]} onPress={()=>this.setState({toEdit: false})}>
                        <Text style={{alignSelf: 'center', color:'#2d0b59'}}> CANCEL </Text>
                    </TouchableOpacity>
                  </View>
                </View>
            )}
        </View>
        
      
    )
  }

}

const styles = StyleSheet.create({
  container:{
    borderBottomWidth: 1,
    borderBottomColor: '#2d0b59',
    paddingTop: 10,
    paddingBottom: 10,
  },

  title: {
    fontWeight: 'bold',
    color:'#2d0b59'
  },

  body:{
    color:'#2d0b59',
    marginBottom: 15,
  },

  button: {
    borderWidth: 0.5,
    backgroundColor: 'white',
    width: 110,
    height: 25,
    justifyContent: 'center',
    borderColor:'#2d0b59',
    marginLeft: 7,
  },

  inputBoxes: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
    marginBottom: 15,
    color: '#2d0b59',
    width:'90%',
  },
})

export default Posts;