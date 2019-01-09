//
//  GroupsTwo.js
//  magic version 1
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, TouchableHighlight, Alert } from "react-native"
import React from "react"
import Group7Five from "./Group7Five"
import Group7Six from "./Group7Six"
import firebase from 'react-native-firebase'


export default class GroupsTwo extends React.Component {

	state = {
	 modalCreateVisible: false,
	 newGroupName: "",
	 newGroupTime: "",
	 newGroupLocation: "",
	 errorMessage: null,
	 successMessage: null,
	 modalDetailVisible: false
 };

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}

	}
	setCreateModalVisible(visible) {
    this.setState({modalCreateVisible: visible});
  }


	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}


	onMiscBigButtonPressed = () => {

		console.log("create");
		// this.setState({ modalDetailVisible: !this.state.modalDetailVisible });
		this.setCreateModalVisible(true);


	}

	groupFlatListMockData = [{
		key: "1",
		name: "Artifical Intelligence Updates",
	}, {
		key: "2",
		name: "NBA Finals",
	}, {
		key: "3",
			name: "NBA Finals",
	}, {
		key: "4",
			name: "NBA Finals",
	}, {
		key: "5",
			name: "NBA Finals",
	}, {
		key: "6",
			name: "NBA Finals",
	}, {
		key: "7",
			name: "NBA Finals",
	}, {
		key: "8",
			name: "NBA Finals",
	}, {
		key: "9",
			name: "NBA Finals",
	}, {
		key: "10",
			name: "NBA Finals",
	}]

	renderGroupFlatListCell = ({ item }) => {

		return (<Group7Five item={item} /> )
	}

	createNewGroup(){
			console.log(this.state.newGroupLocation);
			   const { newGroupName, newGroupLocation, newGroupTime, modalCreateVisible} = this.state
				  var that = this;
			if (newGroupLocation.trim() == "" || newGroupName.trim() == "" || newGroupTime.trim() == "") {
	       this.setState({errorMessage: "Please fill in all fields!"});
	     }
			 else{




			var groupCount = 0;
 firebase.database().ref('groups_count').once('value').then(function(snapshot) {
  	console.log(snapshot.val());
		groupCount = snapshot.val();

		var updates = {};
		updates['/key/'] = groupCount;
		updates['/free_food/'] = false;
		updates['/group_name/'] = newGroupName;
		updates['/location_name/'] = newGroupLocation;
		updates['/time/'] = newGroupTime;
		updates['/number_going/'] = 1;
		// updates['/people/'] = 1;
		// updates['/creator/'] = 1;

		 firebase.database().ref('groups/' + groupCount).update(updates);

		 var update_count = {};
		 update_count['/groups_count/'] = ++groupCount;
		 firebase.database().ref().update(update_count);

		 // this.setCreateModalVisible(!modalCreateVisible);
		 that.setState({newGroupName: "", newGroupTime: "", newGroupLocation: ""});
		 that.setState({modalCreateVisible: !modalCreateVisible});
		 that.setState({successMessage: "Group Added!"})

});
	 }
			// Write the new post's data simultaneously in the posts list and the user's post list.



	}

	render() {

		return <View
				style={styles.groupsView}>
				<MyModal modalVisible={this.state.modalDetailVisible}/>
				<Modal
		 animationType="fade"
		 transparent={true}
		 visible={this.state.modalCreateVisible}
		  onRequestClose={() => {this.setCreateModalVisible(false)}}
	>
	<View
			style={styles.artboard2View}>
			<View
				style={{
					flexDirection: "row",
				}}>
				<TouchableOpacity
					onPress={() => { this.setCreateModalVisible(!this.state.modalCreateVisible);}}
					style={styles.icCloseButton}>
					<Image
						source={require("./../assets/images/ic-close-2.png")}
						style={styles.icCloseButtonImage}/>
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-end",
					}}>
					<View
						style={styles.viewView}>
						<TouchableOpacity
							onPress={() => {this.createNewGroup()}}
							style={styles.icCartButton}>
							<Image
								source={require("./../assets/images/ic-cart.png")}
								style={styles.icCartButtonImage}/>
								<View
									style={{
										width: "100%",
										height: "100%",
										position: "absolute",
									}}>
									<Image
										source={require("./../assets/images/bitmap-3.png")}
										style={styles.bitmapImage}/>
								</View>
						</TouchableOpacity>

					</View>
				</View>
			</View>
			<View
				style={styles.contentView}>
				<View
					style={styles.formView}>
					<View
						style={styles.edittextTextonlyPlaceholderView}>
						<Text
							style={styles.paymentText}>Group Name</Text>
						<View
							style={{
								flex: 1,
								justifyContent: "flex-end",
							}}>
							<TextInput
							placeholder="NBA Finals"
							onChangeText={newGroupName => this.setState({newGroupName}) }
							value={this.state.newGroupName}
							style={styles.TextTextInput}/>

						</View>
					</View>
					<View
						style={styles.edittextTextonlyPlaceholderTwoView}>
						<Text
							style={styles.paymentTwoText}>Venue</Text>
						<View
							style={{
								flex: 1,
								justifyContent: "flex-end",
							}}>
							<TextInput
							placeholder="William's Cafe"
							onChangeText={newGroupLocation => this.setState({newGroupLocation}) }
							value={this.state.newGroupLocation}
							style={styles.TextTwoTextInput}/>
						</View>
					</View>
					<View
						style={styles.edittextTextonlyPlaceholderThreeView}>
						<Text
							style={styles.paymentThreeText}>Time</Text>
						<View
							style={{
								flex: 1,
								justifyContent: "flex-end",
							}}>
							<TextInput
							type="time"
							placeholder="7:00 PM"
							onChangeText={newGroupTime => this.setState({newGroupTime}) }
							value={this.state.newGroupTime}
						/>


						</View>
					</View>
					{this.state.errorMessage &&
         <Text style={{ color: 'red', marginTop: 5}}>
           {this.state.errorMessage}
         </Text>}
				</View>
			</View>
		</View>


	 </Modal>


				<TextInput
					placeholder="Search groups or restaurants"
					style={styles.group5TextInput}/>
				<View
					style={{
						flexDirection: "row",
					}}>
					{this.state.successMessage &&
				 <Text style={{ color: 'green'}}>
					 {this.state.successMessage}
				 </Text>}
					<Text
						style={styles.group5Text}>All Groups</Text>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "flex-end",
						}}>
						<TouchableOpacity
							onPress={this.onMiscBigButtonPressed}
							style={styles.miscBigButtonButton}>
							<Text
								style={styles.miscBigButtonButtonText}>Create</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={styles.groupFlatListViewWrapper}>
					<FlatList
					 keyboardShouldPersistTaps='always'
						horizontal={false}
						numColumns={2}
						renderItem={this.renderGroupFlatListCell}
						data={this.props.groupData}
						style={styles.groupFlatList}/>
				</View>
			</View>
	}
}


const styles = StyleSheet.create({
	groupsView: {
		backgroundColor: 'rgb(255, 255, 255)',
		flex: 1,
	},
	group5SearchBar: {
		color: 'rgb(0, 0, 0)',
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		borderRadius: 17,
		borderWidth: 1,
		borderColor: 'rgb(196, 201, 223)',
		borderStyle: "solid",
		marginLeft: 30,
		marginRight: 30,
		marginTop: 48,
		alignSelf: "stretch",
		height: 44,
	},
	group5Text: {
		color: 'rgb(33, 34, 36)',
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		lineHeight: 0,
		letterSpacing: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginLeft: 30,
		marginTop: 35,
	},
	miscBigButtonButton: {
		backgroundColor: 'rgb(98, 179, 255)',
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 30,
		marginTop: 35,
		width: 58,
		height: 25,
	},
	miscBigButtonButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	miscBigButtonButtonText: {
		color: 'rgb(255, 255, 255)',
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 0,
		letterSpacing: 0,
	},
	groupFlatList: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: "100%",
		height: "100%",
	},
	groupFlatListViewWrapper: {
		marginTop: 27,
		marginBottom: 28,
		alignSelf: "center",
		width: 315,
		flex: 1,
	},
	group5TextInput: {
		backgroundColor: 'rgb(255, 255, 255)',
		borderRadius: 17,
		borderWidth: 1,
		borderColor: 'rgb(196, 201, 223)',
		borderStyle: "solid",
		color: 'rgb(134, 142, 150)',
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		letterSpacing: 0,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 53,
		alignSelf: "stretch",
	},
	groupFlatList: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: "100%",
		height: "100%",
	},
	artboard2View: {
		backgroundColor: 'rgba(55, 58, 61,  0.95)',
		flex: 1,
	},
	icCloseButton: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		shadowColor: 'rgba(0, 0, 0, 0.10594995)',
		shadowRadius: 3,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 19,
		marginTop: 36,
		width: 60,
		height: 60,
	},
	icCloseButtonImage: {
		resizeMode: "contain",
	},
	icCloseButtonText: {
		color: 'rgb(0, 0, 0)',
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0,
	},
	viewView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginRight: 16,
		marginTop: 6,
		width: 63.92,
		height: 90,
	},
	icCartButton: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "flex-end",
		width: 63.92,
		height: 90,
	},
	icCartButtonImage: {
		resizeMode: "contain",
	},
	icCartButtonText: {
		color: 'rgb(0, 0, 0)',
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0,
	},
	bitmapImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(255, 255, 255, 0.0)',
		marginRight: 18,
		marginTop: 48,
		alignSelf: "flex-end",
		width: 27,
		height: 27,
	},
	contentView: {
		backgroundColor: 'rgb(255, 255, 255)',
		borderRadius: 22,
		marginLeft: 16,
		marginRight: 16,
		marginTop: 45,
		alignSelf: "stretch",
		height: 200,
	},
	formView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginLeft: 13,
		marginRight: 19,
		marginTop: 21,
		alignSelf: "stretch",
		height: 158,
	},
	edittextTextonlyPlaceholderView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		alignSelf: "stretch",
		height: 48,
	},
	paymentText: {
		color: 'rgb(0, 0, 0)',
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0.34,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginRight: 236,
		width: 75,
		height: 16,
	},
	edittextTextonlyPlaceholderTwoView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginTop: 7,
		alignSelf: "stretch",
		height: 48,
	},
	paymentTwoText: {
		color: 'rgb(0, 0, 0)',
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0.34,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginRight: 274,
		width: 37,
		height: 16,
	},
	TextTwoTextInput: {
		color: 'rgb(74, 74, 74)',
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 0,
		letterSpacing: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginRight: 4,
		marginBottom: 1,
		alignSelf: "stretch",
	},
	TextTextInput: {
		color: 'rgb(74, 74, 74)',
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 0,
		letterSpacing: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginRight: 5,
		marginBottom: 1,
		alignSelf: "stretch",
	},
	edittextTextonlyPlaceholderThreeView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginTop: 7,
		alignSelf: "stretch",
		height: 48,
	},
	paymentThreeText: {
		color: 'rgb(0, 0, 0)',
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0.34,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginRight: 282,
		width: 29,
		height: 16,
	},
	TextThreeTextInput: {
		color: 'rgb(74, 74, 74)',
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 0,
		letterSpacing: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		marginRight: 6,
		marginBottom: 1,
		alignSelf: "stretch",
	},
})


export class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalVisible: props.modalVisible
    };
    console.log(props.modalVisible);
    console.log("close bro");
  };

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
        <View>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isModalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={styles_modal.container}>
                    <View style={styles_modal.innerContainer}>
                        <Text>Item Detail</Text>
                        <TouchableHighlight
                            style={styles_modal.buttonContainer}
                            onPress={() => { this._setModalVisible(false) }}>
                            <Text style={styles_modal.buttonText}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
  }
}

const styles_modal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#34495e',
 },
 buttonContainer: {
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: '#2c3e50',
    borderRadius: 15
 },
 buttonText: {
    textAlign: 'center',
    color: '#ecf0f1',
    fontWeight: '700'
 },
});
