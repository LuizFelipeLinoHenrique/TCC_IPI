import { AuthPageLayout, authStyles } from '@/src/components/AuthPageLayout';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { supabase } from '@/src/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function newPassword() {
    if (!password.trim()) { setMessage('Informe sua nova senha.'); return; }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setMessage('Não foi possível redefinir a senha.'); return; }
    await supabase.auth.signOut();
    router.replace('/(auth)/signIn');
  }

  return (
    <AuthPageLayout>
      <Text style={authStyles.brand}>Segurança</Text>
      <Text style={authStyles.title}>Redefina sua senha</Text>
      <Text style={authStyles.description}>Escolha uma senha nova para proteger sua conta.</Text>
      <View style={authStyles.form}>
        <View style={authStyles.field}><Text style={authStyles.label}>Nova senha</Text><TextInput autoComplete="new-password" onChangeText={setPassword} placeholder="Digite sua nova senha" placeholderTextColor="#A79E92" secureTextEntry style={authStyles.input} value={password} /></View>
        {message ? <View style={authStyles.error}><Text style={authStyles.errorText}>{message}</Text></View> : null}
        <Pressable accessibilityRole="button" onPress={newPassword} style={({ pressed }) => [authStyles.primaryButton, pressed && authStyles.primaryButtonPressed]}><Text style={authStyles.primaryButtonText}>Redefinir senha</Text></Pressable>
      </View>
    </AuthPageLayout>
  );
}
