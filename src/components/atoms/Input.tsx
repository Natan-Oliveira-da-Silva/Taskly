import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet,
    Animated,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { COLORS } from '../../utils/constants';

const AnimatedText = Animated.createAnimatedComponent(Text);

type MaskType = 'cel-phone' | 'email';

type Props = TextInputProps & {
    label: string;
    error?: string;
    maskType?: MaskType;
};

export default function Input({ label, error, value, maskType, ...rest }: Props) {
    const [focused, setFocused] = useState(false);
    const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animated, {
            toValue: focused || !!value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [animated, focused, value]);

    const labelStyle = {
        position: 'absolute' as const,
        left: 3,
        top: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [13, -25],
        }),
        fontSize: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 13],
        }),
        color: COLORS.mainText,
        paddingHorizontal: 4,
        zIndex: 1,
    };

    const inputCommonProps = {
        style: styles.input,
        value,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        placeholderTextColor: COLORS.secondaryText,
        ...rest,
    };

    return (
      <View style={styles.wrapper}>
          <AnimatedText style={labelStyle}>{label}</AnimatedText>

          {maskType === 'cel-phone' ? (
            <TextInputMask
              type="cel-phone"
              options={{ mask: '(99) 99999-9999'}}
              {...inputCommonProps}
            />
          ) : (
            <TextInput
              {...inputCommonProps}
              keyboardType={maskType === 'email' ? 'email-address' : rest.keyboardType}
              autoCapitalize={maskType === 'email' ? 'none' : rest.autoCapitalize}
            />
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 36,
        width: 329,
    },
    input: {
        height: 47,
        paddingHorizontal: 16,
        fontSize: 16,
        color: COLORS.mainText,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: COLORS.primaryLight,
        backgroundColor: '#fff',
    },
    error: {
        color: '#E53935',
        fontSize: 13,
        marginTop: 4,
        marginLeft: 4,
    },
});
