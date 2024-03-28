import { StyleSheet } from "react-native";
import myColors from "../../components/stylesGlobal/myColors";

export const styles = StyleSheet.create({

  containerTitulo:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    // backgroundColor: 'red',
    marginBottom: 30,
  },
  modal:{
    backgroundColor:'rgba(0,0,0,0.1)',
    width:'100%',
    height:100,
    margin:0,
    padding:0
  } ,
  titulo:{
    textAlign: 'center',
    width: 'auto',
    height: 'auto',
    // backgroundColor: 'aqua',
    fontSize: 27,
    fontWeight: '600',
  },

  containerPrincipalFoto:{
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
  },
  photo:{
    width:'100%',
    height:'100%',
    borderRadius:100,
  },
  containerFoto:{
      width:100,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#fff',
      borderRadius: 100,
  },

      containerInfoName:{
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        width: '70%',
        height: 'auto',
      },

      nameUser:{
        height: 'auto',
        width: '100%',
        padding: 2,
      },
      textNameUser:{
        fontSize: 16,
      },
      emailUser:{
        // backgroundColor: 'green',
        height: 'auto',
        padding: 2,
      },
      textEmailUser:{
        fontSize: 12,
        fontWeight: '300',
      },


      containerPrincipalButtonsConfiguracoes:{
        width: '100%',
        height: 'auto',
        // backgroundColor: 'aqua',
        marginTop: 30,
        paddingHorizontal: 10,
      },
        containerConfiguracao:{
          width: '100%',
          height: 'auto',
          // backgroundColor: 'greenyellow',

        },
        containerContiguracaoTitulo:{
          // backgroundColor:'red',
          paddingLeft: 30,
          marginBottom: 10,
        },

          textTituloConfiguracoes:{
            // backgroundColor: 'yellow',
            fontSize: 20,
            fontWeight: '500',
          },
        containerButtonConfiguracoes:{
          width: '100%',
          height: 50,
          backgroundColor: '#F6F6F6',
          borderRadius: 15,
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 30,
          // justifyContent: 'center',
          marginBottom: 5,

        },
        containerIconConfiguracoes:{
          width: 40,
          height:'auto',
          // backgroundColor: 'blue',
          display: 'flex',
          alignItems: 'center',
          justifyContent:'center',
        },

          iconConfiguracoes:{
            color: myColors.padraoBackground4.backgroundColor,
            // fontSize: 20,
          },

          containerTextConfiguracoes:{
            display: 'flex',
            textAlign: 'center',
            justifyContent:'center',
          },
            textButtonConfiguracoes:{
              // backgroundColor: 'yellow',
              paddingHorizontal: 5,
              fontSize: 16,
              color: myColors.padraoText1.color,
            },


});

