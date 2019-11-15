import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements'
import Modal from "react-native-modal";
import { Linking } from 'react-native';


class Learn extends React.Component {
    state = {
      isModalVisible: false
    };
  
    toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    };
     render() {
    return (
      <View style={styles.container}>
       
        <Image
            style={styles.img}
            resizeMode="contain"
            // source={require('./assets/rn-school-logo.png')}
            source={require('../assets/adhomukhtasana.png')}
          />
        
        <View style={styles.button1}>
        <Button title='Adho mukha svanasana' onPress={this.toggleModal}/>
        <Modal backdropColor={'grey'} backdropOpacity= {1} isVisible={this.state.isModalVisible} >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20 }}>1. Come onto the floor on your hands and knees. Set your knees directly below your hips and your hands slightly forward of your shoulders.
              {'\n'}{'\n'}2. Exhale and lift your knees away from the floor. 
                At first keep the knees slightly bent and the heels lifted away from the floor.
                {'\n'}{'\n'}3. Then with an exhalation, push your top thighs back and stretch your heels onto or down toward the floor.
                {'\n'}{'\n'}4. Firm the outer arms and press the bases of the index fingers actively into the floor.
                {'\n'}{'\n'}5. Adho Mukha Svanasana is one of the poses in the traditional Sun Salutation sequence. It's also an excellent yoga asana all on its own. Stay in this pose anywhere from 1 to 3 minutes. 
                </Text>
                <Text style={{color: 'blue', fontSize: 20 }}
                 onPress={() => Linking.openURL('https://www.youtube.com/watch?v=8nB9MzY7PkY')}>
                   {'\n'}Watch video!{'\n'}
                 </Text>
              <Button title="Return" onPress={this.toggleModal} />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img:{
      width: '50%',
        position: 'absolute',
        left: 0,
        top:-120,
    },
    button1:{
      //flex:1,
        //position: 'absolute',
        left: -100,
        top:-90,
    },
    toptext:{
     // position: 'absolute',
      //justifyContent: 'top',
      //textAlignVertical: 'top'
      left: -100,
       top:-170
    },
    
  
  
    
  });

  export { Learn };
  