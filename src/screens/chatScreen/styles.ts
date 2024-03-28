import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    containerNav:{
        height:50,
        width:'100%',
        marginTop: 53,
        paddingTop:0,
        paddingHorizontal: 10,
        backgroundColor:theme.COLORS.WHITE
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
        color: '#5E5E5E',
        fontSize: 16,
    },


    bubbleStyleRight:{
        minWidth:50,
        color:'#fff',
        backgroundColor: theme.COLORS.LIME_GREEN,
    },
    bubbleStyleLeft:{
        minWidth:50,
        color:'#fff',
        backgroundColor: theme.COLORS.GRAY_400,
    },
    bubbleText:{
        color:'#fff'
    },

    messageTime: {
        fontSize: 12,
        color:'#F0F0F0',
        alignSelf: 'flex-end', // Adjust the alignment as needed
        marginTop:2,
        marginBottom: 4,
        marginHorizontal:10,
    },

    inputBar:{
        backgroundColor:'#FFF',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        padding:5,
        paddingRight:0,
    },
    sendButton:{
        
        borderTopLeftRadius:25,
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:25,

        padding:10,
        height:'130%',
        width:'100%',
        textAlign:'center',
        justifyContent: 'center',
    },

    sendButtonText:{
        color:'#fff',
        textAlign:'center',
    },
})