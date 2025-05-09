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

const borderColors = ['#5B3CC4', '#ca9872', '#32C25B', '#de2000', '#A97E5D'];

export default function AvatarSelectionScreen() {
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<number | null>(null);

    const handleConfirm = async () => {
        if (selected === null) {
            Alert.alert('Aviso', 'Selecione um avatar antes de confirmar.');
            return;
        }

        try {
            await profileService.updateProfileAvatar({
                picture: `avatar_${selected + 1}`,
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
            <Text style={styles.title}>Escolha seu avatar</Text>
            <View style={styles.avatarContainer}>
                {avatars.map((avatar, index) => (
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
                        <Image source={avatar} style={styles.avatarImage} />
                    </TouchableOpacity>
                ))}
            </View>
            <Button
                title="CONFIRMAR"
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.mainText,
        marginBottom: 20,
    },
    avatarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 20,
    },
    avatarWrapper: {
        borderRadius: 100,
        overflow: 'hidden',
        margin: 8,
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
});
