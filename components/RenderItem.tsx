import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import { OnboardingData } from '@/data/data'
import LottieView from 'lottie-react-native'
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'

type Props = {
    index: number
    item: OnboardingData
    x: SharedValue<number>
}

const RenderItem = ({ item, index, x }: Props) => {
    const {width: SCREEN_WIDTH } = useWindowDimensions()

   const lottieAnimationStyle =  useAnimatedStyle(() => { 

    const translateYAnimation = interpolate(x.value, [
        (index -1) *  SCREEN_WIDTH,
         index *  SCREEN_WIDTH,
        (index + 1) *  SCREEN_WIDTH
      ],
      [
          200,
          0,
          -200
      ],Extrapolation.CLAMP)

        return {
            transform: [{
                translateY: translateYAnimation
            }]
        }
   } )

    const circleAnimation = useAnimatedStyle(() => {

        const scale = interpolate(x.value, [
          (index -1) *  SCREEN_WIDTH,
           index *  SCREEN_WIDTH,
          (index + 1) *  SCREEN_WIDTH
        ],
        [
            1,
            4,
            4
        ],Extrapolation.CLAMP)

        return {
            transform: [{
                scale
            }]
        }
    })

  return (
    <View style={{...styles.itemContainer, width: SCREEN_WIDTH}}>
        <View style={styles.circleContainer}>
            <Animated.View  style={[{
                backgroundColor: item.backgroundColor,
                borderRadius: SCREEN_WIDTH /2,
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
            },
            circleAnimation
            ]}/>
        </View>
        <Animated.View  style={lottieAnimationStyle}>
            <LottieView 
            source={item.animation} 
            style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9}}
            autoPlay
            loop
            />
        </Animated.View>
      <Text style={{...styles.itemText, color: item.textColor}}>{item.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 120,
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: 44,
        marginBottom: 10,
        marginHorizontal: 20,
        textAlign: 'center',
    },
    circleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})

export default RenderItem