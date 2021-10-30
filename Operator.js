import React, { Component } from "react";
import { NativeBaseProvider,
		Container,
		Box,
		HStack,
		CheckIcon,
		FormControl,
		Text,
		Button,
		Select} from "native-base";

export default class Operator extends Component {
  constructor(props) {
    super(props);
    this.state = {problem: '', expectedResult: '', additionalInformation: '', type: '', openingDate: '', orderStatus:'', data:'', edit:'', id:''};
  }
  
  register = (navigation) => {
	if(this.state.edit == true){
		fetch('http://127.0.0.1:3333/solicitations/'+this.state.id+'', {
		  method: 'PUT',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			problem: this.state.problem,
			expectedResult: this.state.expectedResult,
			additionalInformation: this.state.additionalInformation,
			type: this.state.type,
			openingDate: this.state.openingDate,
			orderStatus: this.state.orderStatus
		  })
		})
		.then((response) => response.json())
		.then((responseJson) => {
			alert('Solicitation updated!');
			this.state.edit == false;
			this.listSolicitations();
				})
		.catch((error) => {
		  alert(error);
		});
	}else{
		fetch('http://127.0.0.1:3333/solicitations/register', {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			orderStatus: this.state.orderStatus
		  })
		})
		.then((response) => response.json())
		.then((responseJson) => {
			alert('Solicitation registered!');
			this.listSolicitations();
				})
		.catch((error) => {
		  alert(error);
		});
	}
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
  
  loadSolicitationForm = (data) => {
	fetch('http://127.0.0.1:3333/solicitations/search?id=' +data+'',{
	  method: 'GET',
	  headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	  }
	})
    .then(response => response.json())
    .then(solicitation =>{
		this.setState({id: solicitation._id});
		this.setState({problem: solicitation.problem});
		this.setState({expectedResult: solicitation.expectedResult});
		this.setState({additionalInformation: solicitation.additionalInformation});
		this.setState({type: solicitation.type});
		this.setState({openingDate: solicitation.openingDate});
		this.setState({orderStatus: solicitation.orderStatus});
		this.setState({edit: true});
	})
    .catch((error) => {
      alert(error);
    });
  }
  
  render() {
	const { navigation } = this.props;
    const { orderStatus } = this.state;
    return (
	<NativeBaseProvider>
      <Container>
		<FormControl style={{paddingLeft:20, paddingRight:20}}>
			<FormControl.Label _text={{bold: true}}>Status do Pedido</FormControl.Label>
			
			<Select placeholder="Status do Pedido" value={this.state.orderStatus} onValueChange={(orderStatus) => this.setState({orderStatus})}>
				<Select.Item label="aguardando atendimento" />
				<Select.Item label="pendencia" />
				<Select.Item label="em atendimento" />
				<Select.Item label="finalizado" />
			</Select>
			
			<Button onPress={() => this.register(navigation)} mt="5" colorScheme="cyan">
			  Cadastrar
			</Button>
        </FormControl>
		<FormControl style={{paddingLeft:20, paddingRight:11, width:'120%'}}>
			<table>
				<tr>
					<th>Problema Enfrentado</th>
					<th>Resultado Esperado</th>
					<th>Informações Complementares</th>
					<th>Tipo</th>
					<th>Data da Solicitação</th>
					<th>Status da Solicitação</th>
					<th>Editar</th>
					<th>Excluir</th>
				</tr>
				
			{this.state.data.length &&  this.state.data.map(d =>
              <tr>  
                <td><li key={d.problem}>{d.problem}</li></td>
                <td><li key={d.expectedResult}>{d.expectedResult}</li></td>
				<td><li key={d.additionalInformation}>{d.additionalInformation}</li></td>
				<td><li key={d.type}>{d.type}</li></td>
				<td><li key={d.openingDate}>{d.openingDate}</li></td>
				<td><li key={d.orderStatus}>{d.orderStatus}</li></td>
				<td>
					<Button onPress={() => this.loadSolicitationForm(d._id)} colorScheme="cyan" style={{width:'50px', height:'10px'}}>
						  Editar
					</Button>
				</td>
              </tr>  
            )}		
			</table>
        </FormControl>
      </Container>
	</NativeBaseProvider>
    );
  }
}