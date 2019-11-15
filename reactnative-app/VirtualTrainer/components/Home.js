import React from 'react';
import { Button } from 'react-native-elements';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

class Home extends React.Component {
    render() {
        return(
            <View>
                <Text>
                    Home Page here
                </Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            <Button
              title="Go to Learning Page"
              onPress={() => this.props.navigation.navigate('Learn')}
            />
            </View>
            </View>
            
        );
    }
}

export { Home };