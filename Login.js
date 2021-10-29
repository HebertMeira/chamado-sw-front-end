import React, { Component } from 'react';
import { NativeBaseProvider ,
		Container,
		Header,
		Title,
		Box,
		Label,
		Item,
		FormControl, 
        Input,
		Button } from 'native-base';
import { Text, Image } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  login = (navigation) => {
    fetch('http://127.0.0.1:3333/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == 'ok') {
	    fetch('http://127.0.0.1:3333/users/search?email=' +this.state.email+'',{
		  method: 'GET',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' +responseJson.token.token+''
		  }	
		})
        .then(response => response.json())
        .then(data => {
			if(data.role == 'admin'){
				alert('Welcome ' +data.fname+'');
				navigation.navigate('Admin');
			}else if(data.role == 'operator'){
				alert('Welcome ' +data.fname+'');
				navigation.navigate('Operator');
			}
		});
	  }else {
        alert(responseJson.message);
      }
    })
    .catch((error) => {
      alert(error);
    });
  }

render() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    return (
	<NativeBaseProvider>
      <Container>
        <Box header style={{alignSelf:'center'}}>
          <Image source={require('./assets/logo.png')} />
        </Box>

        <FormControl style={{paddingLeft:20, paddingRight:20}}>
			<FormControl.Label _text={{bold: true}}>Email</FormControl.Label>	
			<Input placeholder="Email" onChangeText={(email) => this.setState({email})}/>
			
			<FormControl.Label _text={{bold: true}}>Password</FormControl.Label>
			<Input type="password" placeholder="Password" onChangeText={(password) => this.setState({password})}/>
			
            <Button onPress={() => this.login(navigation)} mt="5" colorScheme="cyan">
			  Login
			</Button>
        </FormControl>
      </Container>
	 </NativeBaseProvider>
    );
  }
}