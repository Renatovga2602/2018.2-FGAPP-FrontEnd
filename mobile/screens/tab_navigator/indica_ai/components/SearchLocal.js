import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextBase,
  ScrollView,
  FlatList
} from "react-native";
import { Card, CardItem } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionSearchLocals } from "../actions/searchBar";
import { Local } from "./Local";

export class SearchLocal extends Component {

    constructor(props) {
        super(props);
        this.state = {searchValue: ''};
    }

    dataLocals = locals => {
      let result=[]
      for (i in locals[0]){
        let local = {
          key: `${locals[0][i].id}`,
          name: locals[0][i].name,
          description: locals[0][i].description,
        }
        result = result.concat(local)
      }
      return result
    }

    componentWillount = () => {
      const url = fetch('https://indicaai.herokuapp.com/locals/', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          locals: responseJson
        })
      }) 
      .catch(error => {
        console.log(error);
      });
    }

    search = () => {
      const searchLocal = this.state.searchValue
      const url = `https://indicaai.herokuapp.com/locals/name/${searchLocal}`  
      fetch( url, { 
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      }) 
        .then(response => response.json())
        .then(responseJson => {
          let result_local = this.dataLocals(responseJson);
          this.setState({
            locals: result_local,
          })
        })
        .catch(error => {
          console.log(error);
        });
    };


    render() {
        const { searchValue } = this.state
        return(
            <View style={styles.container}>
              <View style={styles.containerSearch}>
                <TextInput
                  onChangeText={value => this.setState({searchValue: value})}
                  placeholder="Buscar local"
                  style={{
                    width: 295,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                    height: 50,
                    padding: 5
                  }}
                />
                <TouchableOpacity onPress={() => this.search()}>
                  <View style={styles.buttonSearch}>
                    <Ionicons
                      name="md-search"
                      size={30}
                      style={{
                        color: "#FFF",
                        padding: 10
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <Text>{this.state.searchValue}</Text>
              <FlatList data={this.state.locals} renderItem={({item}) => <Card><CardItem><Text>{item.name}</Text></CardItem></Card>} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  containerSearch: {
    marginTop: 20,
    flexDirection: 'row'
  },
  localList: {
    padding: 20
  },
  buttonSearch: {
    height: 50,
    backgroundColor: '#0AACCC',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  }
});

export default SearchLocal;
