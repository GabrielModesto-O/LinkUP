import { StyleSheet } from "react-native";
import {theme} from "../../../theme";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:theme.COLORS.WHITE,
        marginTop:"55%",
        padding:16,
        borderRadius:10,
        height:'100%'
       
    },
    titleContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    commentTitle:{
        fontSize:theme.FONT_SIZE.LG,
        marginBottom:10,
    },
    newCommentContainer:{
     
    },
    commentInput:{
        width:'100%',
        height:55,
        borderColor:theme.COLORS.GRAY_200,
        borderWidth:1,
        borderRadius:10,
        padding:12,
        marginBottom:15,
    },
    commentButton:{
        backgroundColor:theme.COLORS.LIME_GREEN,
        borderRadius:theme.BUTTONS.RADIUS,
        justifyContent:'center',
        width:90,
        marginRight:5,
        height:45,
        textAlign:'right'
    },
    buttonText:{
        color:theme.COLORS.WHITE,
        textAlign:'center',
        fontSize:theme.FONT_SIZE.SM,
    },

    flatListContainer:{
        height:500
    },
    flatList:{
        marginTop:15,

    },
    commentContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:16,
        marginVertical:12
    },
    userAndCommentContainer:{

    },
    userInfo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    comment:{
        marginVertical:16,
        marginLeft:6
    },
    deleteCommentButton:{
        fontSize:theme.FONT_SIZE.LG
    },
})