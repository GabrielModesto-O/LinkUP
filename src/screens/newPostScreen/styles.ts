import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:15,
  },
  titleContainer:{
    marginBottom:40,
    marginTop:60,
  },
  title:{
    fontSize:theme.FONT_SIZE.XL,
    color:theme.COLORS.GRAY_400
  },
  contentContainer:{
    paddingTop:'30%',
    height:'60%',
    justifyContent:'center',
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
  keyboardContainer:{

  },
  postDataContainer:{
    display:'flex',
  },
  postDescription:{
    marginBottom:0,
    textAlign:'left',
  },
  
  imageContainer:{
    height:'25%',
  },
  postImageToChoose:{
    height:'25%',
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
  image:{
    width:'100%',
    height:240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder:{
    width:'100%',
    height:240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText:{
    color:theme.COLORS.WHITE,
    textAlign:'center',
    fontSize:theme.FONT_SIZE.LG,
    zIndex:1,
    fontWeight:'bold'
  },
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'rgba(0,0,0,0.2)',
    borderRadius:10,
    height:'300%'
  },
  publishButton:{
    width: '50%',
    height: 35,
    justifyContent:'center',
    backgroundColor: theme.COLORS.LIME_GREEN,
    borderRadius: 30,
    //marginLeft:12,
  },
  footer: {
    display:'flex',
    flexDirection: 'row', 
    marginTop: 50,
    justifyContent:'space-between',
    height:'50%',
    width:'100%',
    alignItems:'center',
  },

  iconsContainer:{
    display:'flex',
    flexDirection: 'row', 
  },
  
  iconButton: {
    backgroundColor: theme.COLORS.GRAY_200,
    padding: 13,
    borderRadius: 26,
    marginHorizontal:2,
  },
  publishButtonText:{
    textAlign: 'center',
    color: theme.COLORS.WHITE,
    fontSize: 17,
  },
  
  

});


