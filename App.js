import React, {Component} from 'react';
import axios from 'axios';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Keyboard,
  Image,
} from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.getDataFromApi = this.getDataFromApi.bind(this);
  }

  state = {
    cep:'',
    resultData: []
  }

  getDataFromApi(){
    
    Keyboard.dismiss();

    if (this.state.cep === '') {
      Alert.alert(
        'Aviso!',
        'Campos Vazios!',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    else{
      const encodedCep = encodeURIComponent(this.state.cep);
      axios.get(`https://viacep.com.br/ws/${encodedCep}/json/`)
      .then(res =>{
        const resultcep = res.data;
        this.setState({resultData:resultcep});
      })
      .catch(() => {
        Alert.alert(
          'Erro!',
          'CEP inválido!',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      });
    }
  }
  
  handleCep = (text) =>{
    this.setState({cep : text});
  }

  render(){
    return (
      <View style={styles.Body}>

        <View style={styles.logoView}>
          <Image  source={require('./CEPLOGO.png')}/>
        </View>

        <TextInput  placeholder="Entre com o CEP"
                    underlineColorAndroid="transparent"
                    style={styles.TextInputStyleClass}
                    keyboardType={'numeric'}
                    onChangeText={this.handleCep}/>

        <TouchableOpacity
          style={styles.button}
          onPress={() => { this.getDataFromApi()}}>
          <Text style={{ color: 'white', fontSize: 30, }}>Buscar</Text>
        </TouchableOpacity>

        <View style={styles.resultCard}>
        <Text style={styles.resulttext}>Logradouro: {this.state.resultData.logradouro}</Text>
        <Text style={styles.resulttext}>CEP: {this.state.resultData.cep}</Text>
        <Text style={styles.resulttext}>Complemento: {this.state.resultData.complemento}</Text>
        <Text style={styles.resulttext}>Bairro: {this.state.resultData.bairro}</Text>
        <Text style={styles.resulttext}>Localidade: {this.state.resultData.localidade}</Text>
        <Text style={styles.resulttext}>UF: {this.state.resultData.uf}</Text>
        <Text style={styles.resulttext}>Cód. do município: {this.state.resultData.ibge}</Text>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  
  Body:{
    backgroundColor: "#F0F8FF",
    flex: 1,
  },

  logoView:{
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  TextInputStyleClass:{
    textAlign: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderRadius: 20 ,
    backgroundColor : "#FFFFFF",
    marginTop: 50,
    marginLeft: 60,
    marginRight: 60,
    fontSize: 30,
  },

  resultCard: {
    marginTop: 30,
    backgroundColor : "#FFFFFF",
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 5,
    padding: 2,
  },

  resulttext: {
    fontSize: 25,
  },

  button: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#00BFFF",
    padding: 10,
    marginLeft: 70,
    marginRight: 70,
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderRadius: 20 ,
    color: "#ffffff"
  },

});

export default App;
