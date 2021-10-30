import React, { Component } from "react";
import { NativeBaseProvider ,
		Container,
		Header,
		Title,
		Box,
		Label,
		Item,
		FormControl, 
        Input,
		Button,
		Select		} from 'native-base';
import { Text, Image } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', fname: '', lname: '', role: '', password: ''};
  }
  
  register = () => {
	fetch('http://127.0.0.1:3333/users/register', {
	  method: 'POST',
	  headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
		email: this.state.email,
		fname: this.state.fname,
		lname: this.state.lname,
		type: this.state.type,
		role: this.state.role,
		password: uuidv4()
	  })
	})
	.then((response) => response.json())
	.then((responseJson) => {
		alert('Solicitation registered!');
			})
	.catch((error) => {
	  alert(error);
	});
  }
  
  render() {
    const { navigation } = this.props;
    const { email, fname, lname, role } = this.state;
    return (
	<NativeBaseProvider>
      <Container>
		<Box header style={{alignSelf:'center'}}>
          <Image source={require('./assets/logo.png')} />
        </Box>
        <FormControl style={{paddingLeft:20, paddingRight:20}}>
			<FormControl.Label _text={{bold: true}}>Email</FormControl.Label>	
			<Input placeholder="Email" value={this.state.email} onChangeText={(email) => this.setState({email})}/>
			
			<FormControl.Label _text={{bold: true}}>Primeiro Nome</FormControl.Label>
			<Input placeholder="Primeiro Nome" value={this.state.fname} onChangeText={(fname) => this.setState({fname})}/>
			
			<FormControl.Label _text={{bold: true}}>Ultimo Nome</FormControl.Label>
			<Input placeholder="Ultimo Nome" value={this.state.lname} onChangeText={(lname) => this.setState({lname})}/>
			
			<FormControl.Label _text={{bold: true}}>Perfil de acesso</FormControl.Label>
			<Select placeholder="Perfil de acesso" value={this.state.role} onValueChange={(role) => this.setState({role})}>
				<Select.Item label="Admin" />
				<Select.Item label="Operador" />
			</Select>
			
			<Button onPress={() => this.register()} mt="5" colorScheme="cyan">
			  Cadastrar
			</Button>
        </FormControl>
      </Container>
	 </NativeBaseProvider>
    );
  }
}