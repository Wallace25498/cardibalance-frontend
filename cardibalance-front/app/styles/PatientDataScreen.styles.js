import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
    marginTop: 10,
    alignItems: 'center' ,
  },
  primaryGenderButton: {
     height: 54,
    width: 176,
    backgroundColor: '#F0F2F5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#47579E',
    marginBottom: 20,
  },
    primaryGenderButtonText: {
    textAlign: 'center',
    fontsize: 14,
    color: '#47579E',  
  },

  secundaryGenderButton:{
    height: 54,
    width: 176,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBDEE5',
    marginBottom: 20,
  },
  secundaryGenderButtonText: {
    textAlign: 'center',
    fontsize: 14,
    color: '#121217',   
  },

  date: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  
  },
  dateTitle: {
    textAlign: 'center',
    fontSize: 16,
    color:'#61758A',
    fontWeight: 'regular',
    marginBottom: 20
  }
 
})

export default styles
