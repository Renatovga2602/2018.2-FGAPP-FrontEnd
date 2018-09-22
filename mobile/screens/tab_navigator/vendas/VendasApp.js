import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
// import ProductDelete from './product_delete'

class VendasApp extends Component {
  _onPressButton = async () => {
    fetch('http://IP:5000/api/product_delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'product_id': '13',
        'fk_vendor': '1',
      }),
    })
  }
    render() {
        return (
            <View style={styles.container}>
                <Text>VendasApp</Text>
                <Button title='Delete' onPress={this._onPressButton}/>
            </View>
        );
    }
}
export default VendasApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
