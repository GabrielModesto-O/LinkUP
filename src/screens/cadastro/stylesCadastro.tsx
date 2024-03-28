import { StyleSheet } from 'react-native';
import myColors from '../../components/stylesGlobal/myColors';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  scrollViewContainer:{
    flex:1,
    height:'150%'
  },
  containerTitulo:{
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
  },
  cadastroTitulo:{
    width: 'auto',
    height: 'auto',
    fontSize: 40,
    fontWeight: '600',
    color: myColors.padraoText2.color,
  },

  containerSubtitulo:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
  },

  subtituloPadrãoCadastro:{
    width: '100%',
    height: 'auto',
    fontSize: 16,
    fontWeight: '300',
    color: myColors.padraoText2.color,
  },

  avancar: {
    alignContent: 'center',
    color: '#fff'
  },

  teste:{
    backgroundColor: 'tomato',
    width: '100%',
    height: '100%',
  }

});