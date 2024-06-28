import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'

type Props = {
    index: number
    x: SharedValue<number>
}

const Dot = ({index, x}: Props) => {

    const {width: SCREEN_WIDTH} = useWindowDimensions()

    const animatedDotStyle = useAnimatedStyle(() => {

        const widthAnimation = interpolate(x.value,
            [
                (index -1) *  SCREEN_WIDTH,
            index *  SCREEN_WIDTH,
           (index + 1) *  SCREEN_WIDTH
         ],
            [
                10,
                20,
                10
            ], 
            Extrapolation.CLAMP
        )


        const opacity = interpolate(x.value,
            [
                (index -1) *  SCREEN_WIDTH,
            index *  SCREEN_WIDTH,
           (index + 1) *  SCREEN_WIDTH
         ],
            [
                0.5,
                1,
                0.5
            ], 
            Extrapolation.CLAMP
        )

        return {
            opacity: opacity,
            width:widthAnimation 
        }
    })


    const animatedColor = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(x.value, [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH], ["#005b4f", "#1e2169", "#f15937"])

        return {
            backgroundColor
        }
    })



  return (
    <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]}/>
  )
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        marginHorizontal: 10,

    }
})

export default Dot