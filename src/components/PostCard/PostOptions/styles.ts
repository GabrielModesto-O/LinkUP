import { StyleSheet } from "react-native";
import {theme} from "../../../theme";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:theme.COLORS.WHITE,
        padding:16,
        borderRadius:10,
        marginHorizontal:20,
    },

    modalTitle:{
        fontSize:theme.FONT_SIZE.LG,
        marginBottom:10,
    },
    allOptionsContainer:{
        marginVertical:10
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
})