// @flow
import React, { useEffect, useRef, useState } from 'react'
import {
	SafeAreaView, StyleSheet, View, Dimensions,
	ActivityIndicator,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {  Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { profiles as PROFILES } from '@/constants'
import Card from "./Card";
import { AIcon, ATouch, AView } from "@/components/template";
import { ICON_TYPE } from "@/components/template/AIcon/AIcon";

const { width, height } = Dimensions.get("window");
const toRadians = (angle: number) => angle * (Math.PI / 180);
const rotatedWidth = width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

const Home = () => {
	let translateX = useSharedValue(0)
	let translateY = useSharedValue(0)

	const opacityLoadding = useSharedValue(0)
	const opacityMainCard = useSharedValue(1)
	const rotateZ = useSharedValue(0)
	const opacityYes = useSharedValue(0)
	const opacityNo = useSharedValue(0)

	const [listProfile, setListProfile] = useState(PROFILES.slice(1));
	const [firstProfile, setfirstProfile] = useState(PROFILES[0]);

	const handleAccept = () => {
		opacityLoadding.value = 1
		opacityMainCard.value = withTiming(0, { duration: 300 })
		opacityYes.value = 1;
		rotateZ.value = withSpring(15, { duration: 300 })
		translateX.value = withTiming(500, { duration: 250,  }, () => {
			opacityMainCard.value = withDelay(250, withSpring(1));
			opacityLoadding.value = withDelay(180, withSpring(0));
			translateX.value = 0;
			translateY.value = 0;
			opacityYes.value = withDelay(100, withSpring(0))
			rotateZ.value =  withSpring(0);
		})
		setTimeout(() => {
			setfirstProfile(listProfile[0])
			setListProfile([...listProfile.slice(1), listProfile[0]])
		}, 100);
		
	}
	const handleRefuse = () => {
		translateX.value = withTiming(-500, { duration: 250,  }, () => {
			opacityMainCard.value = withDelay(250, withSpring(1));
			opacityLoadding.value = withDelay(180, withSpring(0));
			translateX.value = 0;
			translateY.value = 0;
			opacityYes.value = withDelay(200, withSpring(0))
			rotateZ.value =  withSpring(0);
		})
		setTimeout(() => {
			setfirstProfile(listProfile[0])
			setListProfile([...listProfile.slice(1), listProfile[0]])
		}, 100);
		opacityLoadding.value = 1
		opacityMainCard.value = withTiming(0, { duration: 300 })
		opacityYes.value = 1;
		rotateZ.value = withSpring(-15, { duration: 300 })
	}
	const onGestureEvent = Gesture.Pan()
		.onUpdate((event) => {
			// console.log('------event.translationX-----------', event.translationX)
			translateX.value = event.translationX;
			translateY.value = event.translationY;
			opacityYes.value = interpolate(
				event.translationX,
				[0, 80],
				[0, 1]
			);
			opacityNo.value = interpolate(
				event.translationX,
				[0, -80],
				[0, 1]
			);
			rotateZ.value = interpolate(
				event.translationX,
				[-width / 2, width / 2],
				[15, -15],
				Extrapolation.CLAMP
			)
		})
		.onEnd((event) => {
			// console.log('------event.translationX-----------', event.translationX)
			if (Math.abs(event.translationX) > 150) {
				translateX.value = withSpring(event.translationX > 0 ? 500 : -500, {}, () => {
					runOnJS(setfirstProfile)(listProfile[0])
					runOnJS(setListProfile)([...listProfile.slice(1), listProfile[0]])
				});
				opacityLoadding.value = 1
				opacityMainCard.value = 0

				opacityMainCard.value = withDelay(400, withSpring(1));
				opacityLoadding.value = withDelay(800, withSpring(0));
				translateX.value = withDelay(100, withSpring(0));
				translateY.value = withDelay(100, withSpring(0));

			} else {
				translateX.value = withSpring(0);
				translateY.value = withSpring(0);
			}
			opacityYes.value = withSpring(0)
			opacityNo.value = withSpring(0)
			rotateZ.value = withDelay(100, withSpring(0));
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ rotateZ: rotateZ.value + 'deg' },
		],
		opacity: opacityMainCard.value,
	}));
	const loaddingStyle = useAnimatedStyle(() => ({
		opacity: opacityLoadding.value,
		zIndex: -1,
	}))
	return (
		<SafeAreaView style={styles.container}>
			<AView style={styles.header}>
				<AIcon origin={ICON_TYPE.FEATHER_ICONS} name="user" size={32} color="gray" />
				<AIcon origin={ICON_TYPE.FEATHER_ICONS} name="message-circle" size={32} color="gray" />
			</AView>
			<AView style={styles.cards}>
				{/* {
					!!listProfile && listProfile.reverse().map(profile => (
						<Card key={profile.id} {...{ profile }} />
					))
				} */}
				{firstProfile && (
					<GestureDetector key={firstProfile.id} gesture={onGestureEvent}>
						{/* <FunctionalComponent> */}
						<Animated.View style={[styles.card, animatedStyle]}>
							<Card profile={firstProfile} likeOpacity={opacityYes} nopeOpacity={opacityNo} />
						</Animated.View>
						{/* </FunctionalComponent> */}
					</GestureDetector>
				)}
				<AView style={[StyleSheet.absoluteFill, styles.cards, loaddingStyle]}>
					<ActivityIndicator size={'large'} />
				</AView>
			</AView>
			<AView style={styles.footer}>
				<ATouch onPress={handleRefuse} style={styles.circle}>
					<AIcon origin={ICON_TYPE.FEATHER_ICONS} name="x" size={32} color="#ec5288" />
				</ATouch>
				<ATouch onPress={handleAccept} style={styles.circle}>
					<AIcon origin={ICON_TYPE.FEATHER_ICONS} name="heart" size={32} color="#6ee3b4" />
				</ATouch>
			</AView>
		</SafeAreaView>
	);
}

function FunctionalComponent(props: { children: React.ReactNode }) {
	return <View collapsable={false}>{props.children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fbfaff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
	},
	cards: {
		flex: 1,
		margin: 8,
		zIndex: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		position: 'absolute',
		width: '87%',
		height: '97%',
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		padding: 16,
	},
	circle: {
		width: 64,
		height: 64,
		borderRadius: 32,
		padding: 12,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		shadowColor: "gray",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.18,
		shadowRadius: 2,
		elevation: 5
	},
});

export default Home
