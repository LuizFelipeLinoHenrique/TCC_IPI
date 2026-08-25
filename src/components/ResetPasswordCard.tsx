import { authStyles } from '@/src/components/AuthPageLayout';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

type ResetPasswordCardProps = { onBack: () => void };

export function ResetPasswordCard({ onBack }: ResetPasswordCardProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function resetPassword() {
    if (!email.trim()) { setMessage('Informe seu endereço de e-mail.'); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'http://localhost:8081/resetPassword',
    });
    setMessage(error ? 'Não foi possível enviar o e-mail. Tente novamente.' : 'Se o e-mail estiver cadastrado, enviaremos as instruções em instantes.');
  }

  return (
    <>
      <Text style={authStyles.brand}>Recuperação</Text>
      <Text style={authStyles.title}>Esqueceu a senha?</Text>
      <Text style={authStyles.description}>Informe seu e-mail para receber as instruções de redefinição.</Text>
      <View style={authStyles.form}>
        <View style={authStyles.field}>
          <Text style={authStyles.label}>E-mail</Text>
          <TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" onChangeText={setEmail} placeholder="voce@exemplo.com" placeholderTextColor="#A79E92" style={authStyles.input} value={email} />
        </View>
        {message ? <View style={authStyles.error}><Text style={authStyles.errorText}>{message}</Text></View> : null}
        <Pressable accessibilityRole="button" onPress={resetPassword} style={({ pressed }) => [authStyles.primaryButton, pressed && authStyles.primaryButtonPressed]}><Text style={authStyles.primaryButtonText}>Enviar instruções</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={onBack} style={authStyles.secondaryButton}><Text style={authStyles.secondaryButtonText}>Voltar para entrar</Text></Pressable>
      </View>
    </>
  );
}
