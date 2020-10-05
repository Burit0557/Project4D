import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function home() {
    const test = 'Tesrt'

    const isTure = () => {
        return true
    }

    return (
        <View>
            <View style={styles.Header}>
                <Text style={styles.body}>Test from Home</Text>
                <Text>{test}</Text>
                <Text>{isTure() ? 'True' : 'false'}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.body}>Test from Home</Text>
                <Text>{test}</Text>
                <Text>{isTure() ? 'True' : 'false'}</Text>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: Colors.black,
    },
    body: {
        backgroundColor: Colors.white,
    },
})