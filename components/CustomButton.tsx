import React from 'react'
import { FlatList, Image, StyleSheet, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import Animated, { AnimatedRef, SharedValue, interpolateColor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

type Props = {
    flatListRef: AnimatedRef<FlatList>
    flatListIndex: SharedValue<number>
    dataLength: number
    x:SharedValue<number>
}

const CustomButton = ({flatListRef, flatListIndex, dataLength, x }: Props) => {

    const { width: SCREEN_WIDTH} = useWindowDimensions()

    const backgroundColor = useAnimatedStyle(() => {

        const bgColor = interpolateColor(x.value, [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH], ["#005b4f", "#1e2169", "#f15937"])

        return {
            backgroundColor: bgColor
        }
    })

    

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return {
          width:
            flatListIndex.value === dataLength - 1
              ? withSpring(140)
              : withSpring(60),
          height: 60,
        };
      });


      const arrowAnimationStyle = useAnimatedStyle(() => {
        return {
          width: 30,
          height: 30,
          opacity:
            flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
          transform: [
            {
              translateX:
                flatListIndex.value === dataLength - 1
                  ? withTiming(100)
                  : withTiming(0),
            },
          ],
        };
      });
    
      const textAnimationStyle = useAnimatedStyle(() => {
        return {
          opacity:
            flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
          transform: [
            {
              translateX:
                flatListIndex.value === dataLength - 1
                  ? withTiming(0)
                  : withTiming(-100),
            },
          ],
        };
      });

  return (
    <View>
        <TouchableWithoutFeedback
            onPress={() => {
                if(flatListIndex.value < dataLength -1) {
                    flatListRef?.current?.scrollToIndex({ index: flatListIndex.value + 1 })
                } else {
                    console.log('Nav to next Screen')
                }
            }}
        >
            <Animated.View style={[styles.container, backgroundColor,  buttonAnimationStyle]}>
                <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
                <Animated.Image source={require('@/assets/images/ArrowIcon.png')}  style={[styles.arrow, arrowAnimationStyle]} />
            </Animated.View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    arrow: {
        position: 'absolute',
        width: 30,
        height: 30

    },
    container: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 60,
        height: 60
    },
    textButton: {color: 'white', fontSize: 16, position: 'absolute'},
})

export default CustomButton;