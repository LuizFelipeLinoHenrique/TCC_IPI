import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type Tab = {
    label: string;
    value: string;
};

type TabsProps = {
    tabs: Tab[];
    activeTab: string;
    onChange: (value: string) => void;
};

export default function Tabs({
    tabs,
    activeTab,
    onChange,
}: TabsProps) {

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
        <View style={styles.container}>
            {tabs.map((tab) => {
                const active = tab.value === activeTab;

                return (
                    <Pressable
                        key={tab.value}
                        style={[
                            styles.tab,
                            active && styles.activeTab,
                        ]}
                        onPress={() => { onChange(tab.value) }}
                        onPressIn={() => { pressionar() }}
                        onPressOut={() => { soltar() }}
                    >
                        <Text
                            style={[
                                styles.text,
                                active && styles.activeText,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#FFFDF9"
    },

    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#DED6CA",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },

    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: "#79553D",
        boxShadow: "0px 5px 15px #5A5146"
    },

    text: {
        fontSize: 16,
    },

    activeText: {
        fontWeight: "bold",
    },
});