import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  welcome: {
    fontSize: 16,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 15,
    marginBottom: 10
  },
  cardLabel: {
    fontSize: 14,
    color: '#666'
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 5
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 10
  },
  primaryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600'
  },
  secondaryButton: {
    backgroundColor: '#f1f1f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: '600'
  },
  tipsContainer: {
    flexDirection: 'row',
    gap: 15
  },
  tipCard: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden'
  },
  nutritionCard: {
    backgroundColor: '#2d5a3d'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  exerciseCard: {
    backgroundColor: '#4a8b5c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  exerciseContent: {
    alignItems: 'center'
  },
  exerciseText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  loggof:{
    marginLeft: "auto",
    marginRight: 20 ,
    justifyContent: 'center',
    alignItems: 'center',
    height:55,
    width:45,
    backgroundColor: '#c6ced1c9',  // cor da borda
    borderWidth: 3,        
    borderColor: '#000',   
    borderRadius: 8,
    

  },

  loggofButton:{
  justifyContent: 'center',
  alignItems: 'center',
  height:55,
  width:55
  
  },
  image : {

     height:35,
    width:25,
  }
})

export default styles
