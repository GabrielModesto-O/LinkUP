import {StyleSheet} from 'react-native'
import { theme } from '../../theme'
import { StatusBar } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        verticalPadding: 10,
        backgroundColor: '#f6f6f6',
        marginTop: StatusBar.currentHeight,
    },
    logoContainer:{
        display:'flex',
        flexDirection:'row',
    },
    postContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    chatIcon:{
        
    },
    commentsModal:{
        backgroundColor:'rgba(0,0,0,0.1)',
        width:'100%',
        height:100,
        margin:0,
        padding:0
    }
})