import { AnimatedButton } from '@/src/components/AnimatedButton';
import { supabase } from '@/src/lib/supabase';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function homeScreen() {

    const [name, setName] = useState<string>("")

    useEffect(() => {
        async function pegarNome() {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                throw error;
            }

            if (user) {
                setName(user.user_metadata?.display_name ?? "");
            }
        }

        pegarNome();

    }, []);

    async function logOff() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log("Erro", error);
            return;
        };

        router.replace("/(auth)/signIn")

    };

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView className="flex-1">
                <View className="flex-1 justify-center items-center">
                    <View className="absolute right-10 bottom-10 gap-10">
                        <AnimatedButton
                            title={"Voltar"}
                            classnamePressable="bg-red-500 rounded-md p-2"
                            classnameText="font-promptLight text-xs text-white"
                            onPress={() => { logOff() }
                            }
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}