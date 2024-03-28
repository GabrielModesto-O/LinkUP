import { StyleSheet } from "react-native";
import {theme} from "../../theme";

export const styles = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:theme.COLORS.WHITE,
        padding:10,
    },
    logoContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    logoText:{
        fontSize:theme.FONT_SIZE.MD,
        marginRight:5
    },
    arrowDownIcon:{

    },
    chatIconContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    upText:{
        color:theme.COLORS.WHITE,
        fontSize:10,
        fontWeight:'800',
        position:'absolute',
        top:'19%',
        right:'22%',        
    },
    chatIcon:{
        fontSize:29,
        color:theme.COLORS.LIME_GREEN,
    },
})