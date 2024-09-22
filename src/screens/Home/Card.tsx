import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Profile } from '@/types/guards/profile'
import { AText, AView } from '@/components/template'
import Animated from 'react-native-reanimated'

interface CardProps {
    profile: Profile;
    likeOpacity?: any;
    nopeOpacity?: any;
}

const Card = ({ profile, likeOpacity = 0, nopeOpacity = 0 }: CardProps) => {
    return (
        <AView style={StyleSheet.absoluteFill}>
            <Image resizeMode='stretch' style={styles.image} source={profile.profile} />
            <AView style={styles.overlay}>
                <AView r aStyle={{ justifyContent: 'space-between' }}>
                    <Animated.View style={[styles.like, { opacity: likeOpacity }]}>
                        <Text style={styles.likeLabel}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.nope, { opacity: nopeOpacity }]}>
                        <Text style={styles.nopeLabel}>NOPE</Text>
                    </Animated.View>
                </AView>
                <AView r aStyle={{justifyContent: 'space-between', backgroundColor: "#ffffff54"}}>
                    <AText h30 color='black'>{profile.name}</AText>
                    <AText h30 color='black'>{profile.age}</AText>
                </AView>
            </AView>
        </AView>
    )
}

export default Card

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 8,
    },
    overlay: {
        flex: 1,
        justifyContent: "space-between",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    like: {
        borderWidth: 4,
        borderRadius: 5,
        padding: 8,
        borderColor: "#6ee3b4",
    },
    likeLabel: {
        fontSize: 32,
        color: "#6ee3b4",
        fontWeight: "bold",

    },
    nope: {
        borderWidth: 4,
        borderRadius: 5,
        padding: 8,
        borderColor: "#ec5288",
    },
    nopeLabel: {
        fontSize: 32,
        color: "#ec5288",
        fontWeight: "bold",
    },
})