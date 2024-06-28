import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { OnboardingData } from '@/data/data'
import { SharedValue } from 'react-native-reanimated'
import Dot from './Dot'

type Props = {
    data: OnboardingData[],
    x: SharedValue<number>
}

const Pagination = ({ data, x }: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {
        data.map((_, index) => ( <Dot key={index} index={index} x={x} />))
      }
    </View>
  )
}

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Pagination