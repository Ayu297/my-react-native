import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import COLORS from '../../constants/colors'

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary
    const outlinedColor = COLORS.white
    const bgColor = COLORS.primary
    const textColor = COLORS.white

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{backgroundColor: bgColor},
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{fontSize: 18, ... {color: textColor} }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Button

// const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    button: {
        width:300,
        height:50,
        justifyContent:'center',
        paddingBottom: 16,
        paddingVertical: 10,
        border: COLORS.primary,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
    },

})