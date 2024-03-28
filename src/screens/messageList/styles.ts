import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      height: 'auto',
      flex: 1,
      padding: 10,
      backgroundColor: '#FFFFFF',

    },

    userPhoto:{
        width: 50,
        height: 50,
        borderRadius: 25
      },

      containerMessage:{

        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        

      },

      messageInfo:{

        flexDirection: 'row',
        alignItems: 'center'
  
        

      },

      nameUserAndMessage:{
        marginLeft: 16,

      },

      title:{
      fontSize:35,
      marginBottom: 10,
      marginTop: 10,
      color: '#5d5d5d'


      },


      searchIcon:{
        marginRight:10,
      },

      buttonback:{
        width: 90,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
      },
    
      textback:{
        color: 'black',
        fontSize: 16,
      },

      containerNav:{
        height:50,
        width:'100%',
        marginTop: 50,
        paddingHorizontal: 10,
      },
    
  });