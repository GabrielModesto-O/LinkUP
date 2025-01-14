import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { StatusBar } from 'react-native';

const myPrincipalContainer = StyleSheet.create({

    containerPrincipal: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        padding:10,
        position: 'absolute',
        zIndex: 1,
        },

    containerPrincipal2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        minHeight: windowHeight,
        height: 'auto',
        padding:10,
        },

    containerPrincipalCadastro: {
        flex: 1,
        height: windowHeight,
        padding:10,
        top: 0,
        left: 0,
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        marginTop: StatusBar.currentHeight
    },
  
    subcontainerPrincipal: {
      width: '100%',
      height: 'auto',
      // backgroundColor: 'tomato',
      paddingHorizontal: 20,
      marginTop: 30,
    },

    subcontainerPrincipalConteudo: {
      width: '100%',
      height: 'auto',
    },

});

export default myPrincipalContainer;