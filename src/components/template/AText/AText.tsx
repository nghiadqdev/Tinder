import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TextProps } from 'react-native';
import { ATextType } from './types';
import { Colors, Fonts, isIOS, normalize } from '@/common';

const AText: FC<ATextType & TextProps> = (props): JSX.Element => {
    const { aStyle, children, title = false, h12 = true, h10 = false, h14 = false, h16 = false, h18 = false, h20 = false, h22 = false, h24 = false, h26 = false, h28 = false, h11, h30,
        font_Heavy = false, font_Bold = false, center = false, numOfLines, color = Colors.black333, w400, w500, w600, w700, w900, lineH, ...rest
    } = props;

    return (
        <Text
            {...rest}
            style={[
                center && styles.center,
                title && styles.title,
                h10 && { fontSize: normalize(10) },
                h11 && { fontSize: normalize(11) },
                h12 && { fontSize: normalize(12) },
                h14 && { fontSize: normalize(14) },
                h16 && { fontSize: normalize(16) },
                h18 && { fontSize: normalize(18) },
                h20 && { fontSize: normalize(20) },
                h22 && { fontSize: normalize(22) },
                h24 && { fontSize: normalize(24) },
                h26 && { fontSize: normalize(26) },
                h28 && { fontSize: normalize(28) },
                h30 && { fontSize: normalize(30) },
                w400 && styles.w400,
                w500 && styles.w500,
                w600 && styles.w600,
                w700 && styles.w700,
                w900 && styles.w900,
                !!lineH && { lineHeight: lineH },
                { color, fontFamily: Fonts.fontPoppins_Medium },
                font_Heavy && { fontFamily: Fonts.fontPoppins_Thin },
                font_Bold && { fontFamily: Fonts.fontPoppins_Bold },
                aStyle,
            ]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: normalize(30),
        lineHeight: normalize(40),
        color: Colors.gray4D4D4D,
    },
    w400: { fontWeight: '400' },
    w500: { fontWeight: isIOS ? '500' : 'bold' },
    w600: { fontWeight: isIOS ? '600' : 'bold' },
    w700: { fontWeight: isIOS ? '700' : 'bold', fontFamily: Fonts.fontPoppins_Bold },
    w900: { fontWeight: isIOS ? '900' : '900', fontFamily: Fonts.fontPoppins_Bold },
    center: {
        textAlign: 'center',
    },
});

export default AText;
