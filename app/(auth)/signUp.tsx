import { AuthPageLayout, authStyles } from '@/src/components/AuthPageLayout';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { setSigningUp } from '../../src/lib/authFlow';
import { supabase } from '../../src/lib/supabase';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function signUp() {
    if (!displayName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Preencha todos os campos.');
      return;
    }
    setSigningUp(true); setLoading(true); setErrorMessage('');
    try {
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { display_name: displayName.trim() } } });
      if (error) throw error;
      if (data.session) await supabase.auth.signOut();
      router.replace('/(auth)/signIn');
    } catch {
      setErrorMessage('Não foi possível criar sua conta. Tente novamente.');
    } finally { setSigningUp(false); setLoading(false); }
  }

  return (
    <AuthPageLayout>
      <Text style={authStyles.brand}>Comece por aqui</Text>
      <Text style={authStyles.title}>Crie sua conta</Text>
      <Text style={authStyles.description}>Leva só um instante para preparar seu espaço.</Text>
      <View style={authStyles.form}>
        <View style={authStyles.field}><Text style={authStyles.label}>Nome de usuário</Text><TextInput autoComplete="username" onChangeText={setDisplayName} placeholder="Como quer ser chamado?" placeholderTextColor="#A79E92" style={authStyles.input} value={displayName} /></View>
        <View style={authStyles.field}><Text style={authStyles.label}>E-mail</Text><TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" onChangeText={setEmail} placeholder="voce@exemplo.com" placeholderTextColor="#A79E92" style={authStyles.input} value={email} /></View>
        <View style={authStyles.field}><Text style={authStyles.label}>Senha</Text><TextInput autoComplete="new-password" onChangeText={setPassword} placeholder="Defina uma senha" placeholderTextColor="#A79E92" secureTextEntry style={authStyles.input} value={password} /></View>
        {errorMessage ? <View style={authStyles.error}><Text style={authStyles.errorText}>{errorMessage}</Text></View> : null}
        <Pressable accessibilityRole="button" disabled={loading} onPress={signUp} style={({ pressed }) => [authStyles.primaryButton, pressed && authStyles.primaryButtonPressed, loading && { opacity: 0.7 }]}>
          {loading ? <ActivityIndicator color="#FFFDF9" /> : <Text style={authStyles.primaryButtonText}>Criar conta</Text>}
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.replace('/(auth)/signIn')} style={authStyles.secondaryButton}><Text style={authStyles.secondaryButtonText}>Voltar para entrar</Text></Pressable>
      </View>
    </AuthPageLayout>
  );
}
