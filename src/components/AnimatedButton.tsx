import { useRef } from "react";
import {
    Animated,
    Pressable,
    Text
} from "react-native";

type AnimatedButtonProps = {
    title: string;
    classnamePressable: string,
    classnameText: string;
    onPress: () => void;
};

export function AnimatedButton({
    title,
    classnamePressable,
    classnameText,
    onPress,
}: AnimatedButtonProps) {

    const scale = useRef(new Animated.Value(1)).current;

    const pressionar = () => {
        Animated.spring(scale, {
            toValue: 0.92,
            useNativeDriver: true,
        }).start();
    };

    const soltar = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={{
                transform: [{ scale }],
            }}
        >
            <Pressable
                onPressIn={pressionar}
                onPressOut={soltar}
                onPress={onPress}
                className={classnamePressable}
            >
                <Text className={classnameText}>
                    {title}
                </Text>
            </Pressable>
        </Animated.View>
    );
}
