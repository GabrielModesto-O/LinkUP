import { StyleSheet } from "react-native";
import {theme} from "../../../../theme";

export const styles = StyleSheet.create({
    postCardContainer:{
        borderRadius:12,
        backgroundColor: theme.COLORS.WHITE,
        
        padding: 16,
        marginVertical:5,
        marginHorizontal:10,
        paddingBottom:5,
    },
    modalTitle:{
        fontSize:theme.FONT_SIZE.LG,
        marginBottom:10,
    },
    titleContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userImage:{
        width:50,
        height:50,
        borderRadius:100,
        marginRight:15
    },
    userInfoContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    userInfo:{    },
    userName:{
        fontSize:theme.FONT_SIZE.MD,    
        color:theme.COLORS.GRAY_700
    },
    userCourse:{
        fontSize:theme.FONT_SIZE.SM,
        color:theme.COLORS.GRAY_700
    },
    addButton:{
        backgroundColor:theme.COLORS.LIME_GREEN,
        borderRadius:theme.BUTTONS.RADIUS,
        justifyContent:'center',
        width:80,
        marginRight:5,
        height:35
    },
    addButtonText:{
        color:theme.COLORS.WHITE,
        textAlign:'center',
        fontSize:theme.FONT_SIZE.SM,
    },
    isFriendText:{
        color:theme.COLORS.GRAY_300,
        marginRight:5
    },
    dotsIcon:{
        fontSize:21
    },
    postContainer:{
        paddingBottom:50
    },
    postButtonsContainer:{
        width:'20%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    postDescription:{
        marginTop:25,
        marginBottom:10,
        color:theme.COLORS.GRAY_700
    },
    postInteractionContainer:{
        display:'flex',
        flexDirection:'row',
        marginTop:10
    },
    removeImageContainer:{
        width:'100%',
        alignItems:'flex-end',
        zIndex:2
    },
    removeImageButton:{
        borderRadius:100,
        width:24,
        height:24,
        marginBottom:-10,
        alignItems:'center',
        backgroundColor:theme.COLORS.LIME_GREEN
    },
    removeImageText:{
        fontSize:theme.FONT_SIZE.MD,
        color:theme.COLORS.WHITE
    },
    postCardImage:{
        width:'100%',
        height:250,
        borderRadius:5,
        resizeMode:'contain',
        justifyContent:'center',
    },
    postImageToChoose:{
        alignItems:"center"
    },
    addImageText:{
        color:theme.COLORS.GRAY_700,
        textAlign:'center',
        fontSize:theme.FONT_SIZE.LG,
        fontWeight:'bold',
      },
    overlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:5,
        height:'100%',
    },
    publishButtonContainer:{
        width:'100%',
        alignItems:'flex-end',
        marginBottom:16
    },
    publishButton:{
        width: '50%',
        height: 35,
        justifyContent:'center',
        backgroundColor: theme.COLORS.LIME_GREEN,
        borderRadius: 30,
        //marginLeft:12,
      },
      publishButtonText:{
        textAlign: 'center',
        color: theme.COLORS.WHITE,
        fontSize: 17,
      },
})