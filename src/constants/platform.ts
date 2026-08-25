import { Platform } from 'react-native';

export function wihchPlatform() {
    Platform.OS === 'android' || Platform.OS === 'ios' ? 'mobile' : Platform.OS === 'web' ? 'web' : 'others'
}