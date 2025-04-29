import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default function AvatarSelectionScreen() {
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<number | null>(null);

    const avatars = [
        require('../assets/avatars/avatar1.jpg'),
        require('../assets/avatars/avatar1.jpg'),
        require('../assets/avatars/avatar1.jpg'),
        require('../assets/avatars/avatar1.jpg'),
        require('../assets/avatars/avatar1.jpg'),
    ];

    const handleConfirm = () => {
        if (selected !== null) {
            navigation.navigate('HomeScreen');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione seu avatar</Text>
            <Text style={styles.subtitle}>Escolha somente um</Text>

            <View style={styles.avatarGrid}>
                {avatars.map((src, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.avatarCircle,
                            selected === index && styles.selectedAvatar,
                        ]}
                        onPress={() => setSelected(index)}
                    >
                        <Image source={src} style={styles.avatarImage} />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>CONFIRMAR SELEÇÃO</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 24,
        color: COLORS.mainText,
        marginTop: 32,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.secondaryText,
        marginBottom: 32,
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
        marginBottom: 32,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'transparent',
        margin: 8,
    },
    selectedAvatar: {
        borderColor: COLORS.primaryLight,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    confirmButton: {
        width: 329,
        height: 47,
        borderRadius: 8,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
