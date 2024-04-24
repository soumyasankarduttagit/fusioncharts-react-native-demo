import React,{Component}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic
} from "@expo-google-fonts/roboto";

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications
global.licenseConfig = {
  key: "rpI3xgkA3D5B3E5D3D4D3C7D6C4D2C2E1hH-8sC11C2dbhvcF3H3znE-13F4E2D3E1D4A3A9B1B6E6B1F4H3D1J2B3nqsD1B1G4cA32B13B9vulG4H3D3jnA-21A5A1E3B-9fbA1A7A4A6A2B4C2D3H1F2C2emoE6E1f1H4akzA5E6F4kzH3MC2D5vpaB2E3C1I3B8A6B5B3C3G4E3B2J2B11y==",
  creditLabel: false // true/false to show/hide watermark respectively
  }
  export default class App extends Component {
    constructor(props) {
    super(props);
    
    const chartConfig = {
    type: 'timeseries',
    width: '100%',
    height: '100%',
    dataFormat: 'json',
    dataSource: {
    data: null,
    caption: {
    text: 'Sales Analysis'
    },
    subcaption: {
    text: 'Grocery'
    },
    yAxis: [
    {
    plot: {
    value: 'Grocery Sales Value',
    type: 'line'
    },
    title: 'Sale Value'
    }
    ]
    },
    schemaJson: null,
    dataJson: null
    };
    
    this.state = {
    chartConfig
    }
    }
    
    componentDidMount() {
    this.fetchDataAndSchema();
    }
    
    fetchDataAndSchema() {
    const jsonify = res => res.json();
    const dFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
    ).then(jsonify);
  //   const dFetch =[
  //     ["05/22/2003", "pH", 4.36, 21.9],
  //     ["05/27/2003", "pH", 4.38, 22.2],
  //     ["06/03/2003", "pH", 4.53, 19.9],
  //     ["06/05/2003", "pH", 4.43, 26.1],
  //     ["06/10/2003", "pH", 4.53, 19.8],
  //     ["06/12/2003", "pH", 4.51, 20.2]
  // ];
    // This is the remote url to fetch the schema.
    const sFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
    ).then(jsonify);
  //   const sFetch = [{
  //     "name": "Date",
  //     "type": "date",
  //     "format": "%m/%d/%Y"
  // }, {
  //     "name": "Type",
  //     "type": "string"
  // }, {
  //     "name": "Value",
  //     "type": "number"
  // }, {
  //     "name": "Temperature",
  //     "type": "number"
  // }];
    Promise.all([dFetch, sFetch]).then(res => {
    const data = res[0];
    const schema = res[1];
    const updatedChartConfig = {...this.state.chartConfig, dataJson: data, schemaJson: schema}
    this.setState({ chartConfig: updatedChartConfig });
    });
    }
    
    render() {
    const modules = ['timeseries'];
    console.log("chartConfig",this.state.chartConfig);
    return (
    <View style={styles.container}>
    <Text style={styles.heading}>
    FusionTime Integration with React Native
    </Text>
    
    <ReactNativeFusionCharts
    chartConfig={this.state.chartConfig}
    modules={modules}
    />
    </View>
    
    );
    }
    }
    
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 10
    },
    heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
    },
    chartContainer: {
    height: 500
    }
    });
    
