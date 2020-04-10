import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    picker: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 180,
        paddingLeft: 16,
        paddingVertical: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#fff0',
    },
    text: {
        color: '#fff',
        textAlign: 'left',
    },
    icon: {
        transform: [
            {rotate: '-90deg'}
        ],
    },
});

export default styles;