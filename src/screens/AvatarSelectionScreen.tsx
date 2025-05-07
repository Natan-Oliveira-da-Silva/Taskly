import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../utils/constants';
import Button from '../components/atoms/Button';
import { profileService } from '../domain/profile';

const avatars = [
    require('../assets/avatars/avatar1.jpg'),
    require('../assets/avatars/avatar1.jpg'),
    require('../assets/avatars/avatar1.jpg'),
    require('../assets/avatars/avatar1.jpg'),
    require('../assets/avatars/avatar1.jpg'),
];

const borderColors = ['#5B3CC4', '#ca9872', '#32C25B', '#de2000', '#A97E5D'];

export default function AvatarSelectionScreen() {
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<number | null>(null);

    const handleConfirm = async () => {
        if (selected === null) {
            Alert.alert('Selecione um avatar');
            return;
        }

        try {
            const picture = `avatar_${selected + 1}`;
            await profileService.updateProfileAvatar({ picture });
            navigation.navigate('AuthStack');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar avatar. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SELECIONE UM AVATAR</Text>
            <Text style={styles.subtitle}>(Escolha somente um)</Text>

            <View style={styles.grid}>
                <View style={styles.row}>
                    {[0, 1, 2].map(index => renderAvatar(index))}
                </View>
                <View style={styles.row}>
                    {[3, 4].map(index => renderAvatar(index))}
                </View>
            </View>

            <Button title="CONFIRMAR SELEÇÃO" variant="filled" onPress={handleConfirm} height={39} />
        </View>
    );

    function renderAvatar(index: number) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelected(index)}
                style={[
                    styles.avatarWrapper,
                    { borderColor: borderColors[index] },
                    selected === index && styles.selected,
                ]}
            >
                <Image source={avatars[index]} style={styles.avatar} />
                <View style={[
                    styles.overlay,
                    selected === index && styles.overlaySelected
                ]} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        paddingTop: 64,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.mainText,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.secondaryText,
        marginBottom: 24,
    },
    grid: {
        marginBottom: 32,
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 8,
    },
    avatarWrapper: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 3,
        overflow: 'hidden',
        position: 'relative',
    },
    selected: {},
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 48,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    overlaySelected: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
});
