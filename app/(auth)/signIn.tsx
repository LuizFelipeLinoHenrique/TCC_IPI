import { AuthPageLayout, authStyles } from '@/src/components/AuthPageLayout';
import { ResetPasswordCard } from '@/src/components/ResetPasswordCard';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { supabase } from '../../src/lib/supabase';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetMode, setResetMode] = useState(false);

  async function logIn() {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha todos os campos.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setErrorMessage(error.message === 'Invalid login credentials' ? 'Credenciais inválidas.' : 'Não foi possível entrar. Tente novamente.');
  }

  return (
    <AuthPageLayout>
      {resetMode ? <ResetPasswordCard onBack={() => setResetMode(false)} /> : <>
      <Text style={authStyles.brand}>Sua conta</Text>
      <Text style={authStyles.title}>Boas-vindas de volta</Text>
      <Text style={authStyles.description}>Entre para continuar de onde parou.</Text>

      <View style={authStyles.form}>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>E-mail</Text>
          <TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" onChangeText={setEmail} placeholder="voce@exemplo.com" placeholderTextColor="#A79E92" style={authStyles.input} value={email} />
        </View>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>Senha</Text>
          <TextInput autoComplete="current-password" onChangeText={setPassword} placeholder="Digite sua senha" placeholderTextColor="#A79E92" secureTextEntry style={authStyles.input} value={password} />
          <Pressable accessibilityRole="button" onPress={() => setResetMode(true)}><Text style={authStyles.link}>Esqueceu a senha?</Text></Pressable>
        </View>
        {errorMessage ? <View style={authStyles.error}><Text style={authStyles.errorText}>{errorMessage}</Text></View> : null}
        <Pressable accessibilityRole="button" onPress={logIn} style={({ pressed }) => [authStyles.primaryButton, pressed && authStyles.primaryButtonPressed]}>
          <Text style={authStyles.primaryButtonText}>Entrar</Text>
        </Pressable>
      </View>
      <View style={authStyles.footer}>
        <Text style={authStyles.footerText}>Primeira vez?</Text>
        <Link href="/(auth)/signUp" style={authStyles.link}>Criar uma conta</Link>
      </View>
      </>}
    </AuthPageLayout>
  );
}
