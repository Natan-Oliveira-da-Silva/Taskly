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
    require('../assets/avatars/avatar1.png'),
    require('../assets/avatars/avatar2.png'),
    require('../assets/avatars/avatar3.png'),
    require('../assets/avatars/avatar4.png'),
    require('../assets/avatars/avatar5.png'),
];

const borderColors = ['#5B3CC4', '#E6E0F7', '#32C25B', '#E63946', '#B58B46'];

export default function AvatarSelectionScreen() {
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<number | null>(null);

    const handleConfirm = async () => {
        if (selected === null) {
            Alert.alert('Aviso', 'Selecione um avatar antes de confirmar.');
            return;
        }

        try {
            const profile = await profileService.getProfile();

            await profileService.updateProfileAvatar({
                picture: `avatar_${selected + 1}`,
                name: profile.name,
                phone_number: profile.phone_number,
            });

            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }],
            });
        } catch {
            Alert.alert('Erro', 'Não foi possível atualizar o avatar.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>SELECIONE SEU AVATAR</Text>
            <Text style={styles.subTitle}>(Escolha somente um.)</Text>

            {/* Primeira linha (3 avatares) */}
            <View style={styles.row}>
                {avatars.slice(0, 3).map((avatar, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelected(index)}
                        style={[
                            styles.avatarWrapper,
                            {
                                borderColor: selected === index ? borderColors[index] : 'transparent',
                                borderWidth: 3,
                            },
                        ]}
                    >
                        <Image
                            source={avatar}
                            style={[
                                styles.avatarImage,
                                selected !== null && selected !== index && styles.avatarImageNotSelected,
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Segunda linha (2 avatares) */}
            <View style={styles.row}>
                {avatars.slice(3, 5).map((avatar, index) => (
                    <TouchableOpacity
                        key={index + 3}
                        onPress={() => setSelected(index + 3)}
                        style={[
                            styles.avatarWrapper,
                            {
                                borderColor: selected === index + 3 ? borderColors[index + 3] : 'transparent',
                                borderWidth: 3,
                            },
                        ]}
                    >
                        <Image
                            source={avatar}
                            style={[
                                styles.avatarImage,
                                selected !== null && selected !== index + 3 && styles.avatarImageNotSelected,
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <Button
                style={styles.avatarBtn}
                title="CONFIRMAR SELEÇÃO"
                variant="filled"
                onPress={handleConfirm}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.mainText,
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 14,
        color: COLORS.mainText,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    avatarWrapper: {
        borderRadius: 100,
        overflow: 'hidden',
        marginHorizontal: 8,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarImageNotSelected: {
        opacity: 0.4,
    },
    avatarBtn: {
    marginTop: 50,
},
});
