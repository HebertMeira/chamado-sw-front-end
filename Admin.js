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
		Button } from 'native-base';
import { Text, Image } from 'react-native';
import InputDatetimeLocal from 'react-input-datetime-local';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {problem: '', expectedResult: '', additionalInformation: '', type: '', openingDate: '', data:''};
  }
  
  register = (navigation) => {
    fetch('http://127.0.0.1:3333/solicitations/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        problem: this.state.problem,
        expectedResult: this.state.expectedResult,
		additionalInformation: this.state.additionalInformation,
		type: this.state.type,
		openingDate: this.state.openingDate
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
		alert('Solicitation registered!');
		    })
    .catch((error) => {
      alert(error);
    });
	
	this.listSolicitations();
  }
  
  listSolicitations = () => {
	fetch('http://127.0.0.1:3333/solicitations/list',{
	  method: 'GET',
	  headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	  }	
	})
	.then(response => response.json())
	.then(data => this.setState({data}))
    .catch((error) => {
      alert(error);
    });
  }
  
  componentDidMount() {
    this.listSolicitations();
  }
  
  componentDidUpdate(){
	this.listSolicitations();
  }
  
  render() {
    const { navigation } = this.props;
    const { problem, expectedResult, additionalInformation, type, openingDate } = this.state;
    return (
	<NativeBaseProvider>
      <Container>
        <FormControl style={{paddingLeft:20, paddingRight:20}}>
			<FormControl.Label _text={{bold: true}}>Problema Enfrentado</FormControl.Label>	
			<Input placeholder="Problema Enfrentado" onChangeText={(problem) => this.setState({problem})}/>
			
			<FormControl.Label _text={{bold: true}}>Resultado Esperado</FormControl.Label>
			<Input placeholder="Resultado Esperado" onChangeText={(expectedResult) => this.setState({expectedResult})}/>
			
			<FormControl.Label _text={{bold: true}}>Informações Complementares</FormControl.Label>
			<Input placeholder="Informações Complementares" onChangeText={(additionalInformation) => this.setState({additionalInformation})}/>
			
			<FormControl.Label _text={{bold: true}}>Tipo</FormControl.Label>
			<Input placeholder="Tipo" onChangeText={(type) => this.setState({type})}/>

			<FormControl.Label _text={{bold: true}}>Data da Solicitação</FormControl.Label>
			<Input placeholder="Data da Solicitação" onChangeText={(openingDate) => this.setState({openingDate})}/>
			
			<Button onPress={() => this.register(navigation)} mt="5" colorScheme="cyan">
			  Cadastrar
			</Button>
        </FormControl>
		<FormControl style={{paddingLeft:20, paddingRight:20}}>
			<table>
				<tr>
					<th>Problema Enfrentado</th>
					<th>Resultado Esperado</th>
					<th>Informações Complementares</th>
					<th>Tipo</th>
					<th>Data da Solicitação</th>
				</tr>
				<tr>
					<td>{ this.state.data.length && this.state.data.map(d => <li key={d.problem}>{d.problem}</li>) }</td>
					<td>{ this.state.data.length && this.state.data.map(d => <li key={d.expectedResult}>{d.expectedResult}</li>) }</td>
					<td>{ this.state.data.length && this.state.data.map(d => <li key={d.additionalInformation}>{d.additionalInformation}</li>) }</td>
					<td>{ this.state.data.length && this.state.data.map(d => <li key={d.type}>{d.type}</li>) }</td>
					<td>{ this.state.data.length && this.state.data.map(d => <li key={d.openingDate}>{d.openingDate}</li>) }</td>
				</tr>
			</table>
        </FormControl>
      </Container>
	 </NativeBaseProvider>
    );
  }
}