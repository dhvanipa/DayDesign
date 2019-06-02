import {Text, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CheckoutItem from '../../models/CheckoutItem';
import { tConvert } from '../../utils';

export default class CurrentOrderScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null,
      currentUser: null,
    };
  };

  constructor (props) {
    super (props);

    const {navigation} = this.props;
    var currentOrder = navigation.getParam ('currentOrder', null);
    this.state = {
      currentOrder: currentOrder,
    };

  }

  componentDidMount () {}

  componentWillUnmount () {}

  renderViewFlatListCell = ({item}) => {
    return <CheckoutItem food={item} />;
  };

  formatPickupTime(pickup_time){
    if(pickup_time-1 < 10){
      return tConvert("0" + (pickup_time-1).toString() + ":59")
    }
    else{
      return tConvert((pickup_time-1).toString() + ":59")
    }
  }

  _keyExtractor = (item, index) => item.food_id;

  render () {
    var currentOrder = this.state.currentOrder;
    return (
      <View style={styles.menuView}>
        <View style={styles.backgroundView}>
          <View style={styles.graybackgroundView}>
            <Text style={styles.nextmoneyText}>10%</Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.buyersneededText}>$95/100</Text>
            </View>
          </View>
            <TouchableOpacity
            onPress={() => {
            this.props.navigation.navigate ('History');
            }}
            style={styles.buttonButton}>
            <Text style={styles.buttonButtonText}>History</Text>
            </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.shawarmaPlusText}>Current Order</Text>
          <View style={styles.viewFlatListViewWrapper}>
            <FlatList
              renderItem={this.renderViewFlatListCell}
              //data={currentOrder.foods}
              keyExtractor={this._keyExtractor}
              style={styles.viewFlatList}
            />
          </View>
          <View style={styles.viewTwoView}>
            <View style={styles.viewThreeView}>
              <Text style={styles.statusText}>Status:</Text>
              <Text style={styles.readyText}>{currentOrder ? currentOrder.status ? "Ready" : "Not Ready" : "-"}</Text>
            </View>
            <View style={{}}>
              <View style={styles.viewView}>
                <Text style={styles.pickUpBeforeText}>Pick-Up Before:</Text>
                <Text style={styles.amText}>{currentOrder ? this.formatPickupTime(currentOrder.pickup_time) : "-"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.viewFourView}>
            <View style={styles.backgroundTwoView} />
            <View
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
                position: 'absolute',
                justifyContent: 'flex-end',
              }}
            >
              <Text style={styles.orderNumberText}>Order Number:</Text>
              <Text style={styles.mb2Text}>{currentOrder ? currentOrder.order_number : "-"}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  menuView: {
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
  },
  backgroundView: {
    backgroundColor: 'rgba(55, 58, 61, 0.9)',
    height: 123,
    alignItems: 'center',
  },
  graybackgroundView: {
    backgroundColor: 'rgba(226, 175, 47, 0.99)',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgb(246, 246, 246)',
    borderStyle: 'solid',
    marginTop: hp ('5%'),
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  nextmoneyText: {
    color: 'white',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: hp ('1.5%'),
    width: 70,
    //height: 29.92,
  },
  buyersneededText: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginBottom: hp ('1.5%'),
    width: 70,
  },
  shawarmaPlusText: {
    color: 'rgb(246, 246, 246)',
    fontSize: hp ('4%'),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'rgb(114, 167, 228)',
    overflow: 'hidden',
    // marginTop: hp('14%'),
    width: wp ('100%'),
    height: hp ('5%'),
    //flex: 1,
  },
  viewFlatList: {
    backgroundColor: 'transparent',
  },
  viewFlatListViewWrapper: {
    marginTop: hp ('1%'),
    height: hp ('40%'),
  },
  viewTwoView: {
    backgroundColor: 'transparent',
    marginTop: hp ('2%'),
    alignSelf: 'center',
    flex: 1,
    marginLeft: wp ('5%'),
  },
  viewThreeView: {
    backgroundColor: 'transparent',
  },
  statusText: {
    color: 'rgb(74, 74, 74)',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 1,
    width: 360,
  },
  readyText: {
    color: 'rgb(74, 74, 74)',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: 361,
  },
  viewFourView: {
    backgroundColor: 'transparent',
    marginLeft: 6,
    marginRight: 6,
    marginBottom: hp ('4%'),
  },
  pickUpBeforeText: {
    color: 'rgb(74, 74, 74)',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: 360,
  },
  amText: {
    color: 'rgb(74, 74, 74)',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 1,
    width: 359,
  },
  viewView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: hp ('1%'),
  },
  backgroundTwoView: {
    backgroundColor: 'rgb(73, 76, 79)',
    borderRadius: 22,
    height: 56,
    alignItems: 'flex-start',
  },
  orderNumberText: {
    color: 'rgb(246, 246, 246)',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginRight: 1,
    width: 362,
  },
  mb2Text: {
    color: 'rgb(246, 246, 246)',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginRight: 1,
    marginBottom: 6,
    width: 362,
  },
  buttonButton: {
    //position: "absolute",
    marginLeft: wp ('75%'),
    marginTop: hp ('-8%'),
  },
  buttonButtonText: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  buttonButtonImage: {
    resizeMode: 'contain',
  },
});
