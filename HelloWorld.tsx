import React from 'react';
import { Text, View } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic
} from "@expo-google-fonts/roboto";

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

const HelloWorldApp = () => {
  const chartData = [
    { label: "Venezuela", value: "250" },
    { label: "Saudi", value: "260" },
    { label: "Canada", value: "180" },
    { label: "Iran", value: "140" },
    { label: "Russia", value: "115" },
    { label: "UAE", value: "100" },
    { label: "US", value: "30" },
    { label: "China", value: "30" },
  ];
  const chartConfig = {
    type: "column2D",
    width: "300",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Countries With Most Oil Reserves [2017-18]",
        subCaption: "In MMbbl = One Million barrels",
        xAxisName: "Country",
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        theme: "fusion",
        captionFont:"Roboto_400Regular",
        exportEnabled: 1 // to enable the export chart functionality
      },
      data: chartData
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
      }}>
      <Text>Fusioncharts demo</Text>
      <ReactNativeFusionCharts
        chartConfig={chartConfig}
      />
    </View>
  );
};
export default HelloWorldApp;