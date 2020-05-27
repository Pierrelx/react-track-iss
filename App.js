import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const [position, setPosition] = useState({
    latitude: 49.4431,
    longitude: 1.0992,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })

  async function getPosition(){
    try {
      let response = await fetch(
        'http://api.open-notify.org/iss-now.json'
      );
      let json = await response.json();
      setPosition({
        latitude: parseFloat(json.iss_position.latitude),
        longitude: parseFloat(json.iss_position.longitude),
        latitudeDelta: 1,
        longitudeDelta: 1,
      })
    } catch(error){
      console.log(error)
    }
  }
  getPosition()

  return (
      <MapView
        style={{flex: 1}}
        region={position}
        >
          <Marker coordinate={position} title={"ISS"}>
            <Image source={require("./assets/img/iss.png")} style={{width: 60, height: 60}}/>
          </Marker>
        </MapView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
