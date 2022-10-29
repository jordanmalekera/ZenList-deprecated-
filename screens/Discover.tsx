import { Text, TextProps, View, ViewProps } from '../components/Themed';
import { StyleSheet } from 'react-native'
import React, { ComponentProps } from 'react';
import { RootTabScreenProps } from '../types';

export default function Discover({ navigation }: RootTabScreenProps<'Discover'>) {
        return (
            <View>
                <Text>This is </Text>
            </View>
        )
}

const styles = StyleSheet.create({
    img: {
        width: 20,
        height: 20
    }
})