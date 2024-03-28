import { StyleSheet } from "react-native";
import {theme} from "../../../theme";

export const styles = StyleSheet.create({
    
    container:{
        backgroundColor:theme.COLORS.WHITE,
        padding:16,
        borderRadius:10,
        marginHorizontal:20,
    },
    hiddenPostsContainer:{
      marginBottom:5,
    },
    modalTitle:{
        fontSize:theme.FONT_SIZE.LG,
        marginBottom:10,
    },
    allOptionsContainer:{
        maxHeight:'90%',
        margin:0,
        padding:0,

    },
    postButtonsContainer:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end',
    },
    showAgainButton:{
      backgroundColor:theme.COLORS.LIME_GREEN,
      borderRadius:theme.BUTTONS.RADIUS,
      justifyContent:'center',
      width:'100%',
      marginTop:10,
      height:35
    },
    showAgainButtonText:{
        color:theme.COLORS.WHITE,
        textAlign:'center',
        fontSize:theme.FONT_SIZE.SM,
    },
    userCourse:{
      fontSize:theme.FONT_SIZE.SM,
      color:theme.COLORS.GRAY_700,
    },
    titleContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2, // Adiciona uma sombra no Android
        shadowColor: '#000', // Adiciona uma sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      width:'100%',
      padding: 10,

    },
    optionText: {
      marginLeft: 8,
      fontSize: 16,
      color: '#333',
    },
    flatList:{
    },
    flatListSeparator:{
      marginVertical:20,
      color:'#000',
      fontSize:20,
      width:'100%',
    },
})