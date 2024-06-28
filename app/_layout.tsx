import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, View, StyleSheet, FlatList, ViewToken } from 'react-native';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import data, { OnboardingData } from '@/data/data';
import RenderItem from '@/components/RenderItem';
import Pagination from '@/components/Pagination';
import CustomButton from '@/components/CustomButton';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>()
  const x = useSharedValue<number>(0)
  const flatListIndex = useSharedValue<number>(0)



  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    }
  })

  const onViewableItemsChanged = (({ viewableItems} : { viewableItems:  ViewToken[]}) => {
      if(viewableItems[0].index !== null) {
        flatListIndex.value = viewableItems[0].index
      }
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> */}
      <View style={styles.container}>
        <Animated.FlatList 
        ref={flatListRef} 
        keyExtractor={item => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={data} 
        renderItem={({ item, index }) => {
          return (
            <RenderItem  item={item} index={index} x={x} />
          )
        }}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10
        }}
        />

        <View style={styles.bottomContainer}>
            <Pagination data={data} x={x}  />
            <CustomButton 
            flatListIndex={flatListIndex} 
            flatListRef={flatListRef} 
            dataLength={data.length} 
            x={x} 
            />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
   },
   bottomContainer: {
    marginHorizontal: 30,
    paddingVertical: 30,
    position:'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   }
})

