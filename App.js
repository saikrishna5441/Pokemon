import React ,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Switch,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import axios from "axios";

const App: () => React$Node = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [apiData, setApiData] = useState('');
  const[limit,setLimit]=useState(20);
  const[offSet,setOffSet]=useState(20);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offSet, {
    }).then(res => {
      setApiData(res.data.results)
      console.log("urlvalue", apiData)
    }).catch(err => console.log(err));
  });


  const toggleSwitch = (value) => {
    setSwitchValue(value);
    console.log("switchValue",switchValue)
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.switchContainer}>
        <Text style={styles.labelName}>Comfortable</Text>
        <Switch
          style={{marginBottom:10, marginRight:10}}
          onValueChange={toggleSwitch}
          value={switchValue}
/>
          <Text style={styles.labelName}>Compact</Text></View>

        {switchValue === false?
          <FlatList
            style={{marginBottom:30}}
          data = {apiData}
          renderItem={
            ({ item }) =>
              <View style={styles.comfortable}>

                <Image source = {require('../Pokemon/assets/pokemon.png')}
                       style={styles.comfortableImage} />

                <View style={styles.nameContainer}>
                  <Text style={styles.textStyle}>{item.name}</Text>
                  <Text>{item.url}</Text>
                </View>
              </View>

          }
        />:<FlatList
          key={2}
          numColumns={2}
          data={apiData}
          renderItem={
            ({item}) =>
              <View style={styles.compact}>
                <Image
                  source = {require('../Pokemon/assets/pokemon.png')}
                  style={styles.compactImage}/>

                <View style={styles.nameContainer}>
                  <Text style={styles.textStyle}>{item.name}</Text>
                </View>
              </View>
          }
        />}

<TouchableOpacity
  onPress={() => {
    setLimit(limit+20)
    setOffSet(offSet+20)
  }}
  style={styles.buttonStyle}>
  <Text style={styles.buttonText}>Show More</Text>

</TouchableOpacity>
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
nameContainer:{
  marginLeft: 20,
  alignSelf:"center"

},
  buttonText:{
    alignSelf:"center",
    color:"#ffffff",
    textAlign: 'center',
    textAlignVertical: "center"
  },
  buttonStyle:{
    height: 50,
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    width: 130,
    justifyContent: "center",
    backgroundColor:"#d1311f",
    borderRadius:20,
    alignItems: "center",
    borderWidth:1,

  },
  labelName:{
    marginRight:10,
    fontStyle: 'italic',
    fontSize: 16
  },
  switchContainer:{
    marginBottom:10,
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center"
  },
  textStyle:{
    fontSize:18,
    marginBottom:5,
    fontWeight:"bold"
  },
  comfortable: {
    width:"94%",
    borderColor:"#000000",
    borderWidth:1,
    height:140,
    marginLeft:"3%",
    marginBottom:10,
    marginRight:"3%",
    borderRadius:10,
    flexDirection:"row"
  },
  comfortableImage:{

    height: 100,
    width: 100,
    borderRadius: 10,
    alignSelf:"center",
    marginLeft :5
  },
  compact: {
    width:"45%",
    borderColor:"#000000",
    borderWidth:1,
    marginBottom:10,
    height:150,
    marginLeft:"2%",
    marginRight:"2%",
    borderRadius:10,
  },
  compactImage:{
    height: 100,
    marginTop:10,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginBottom:5,
    width: "100%",
    borderRadius: 10,
    alignSelf:"center",
    marginLeft :5
  }
});

export default App;
