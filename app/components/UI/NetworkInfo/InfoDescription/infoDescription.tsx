import React, { memo, useCallback } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import { strings } from '../../../../../locales/i18n';
import { useNavigation } from '@react-navigation/native';
import { MAINNET } from '../../../../constants/network';
import { useAppThemeFromContext, mockTheme } from '../../../../util/theme';

const createStyles = (colors: {
	background: { default: string };
	text: { default: string };
	border: { muted: string };
	info: { default: string };
}) =>
	StyleSheet.create({
		descriptionContainer: {
			marginBottom: 10,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: colors.border.muted,
		},
		contentContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 4,
		},
		numberStyle: {
			marginRight: 10,
			color: colors.text.default,
		},
		link: {
			color: colors.info.default,
		},
		description: {
			width: '94%',
			color: colors.text.default,
		},
	});

interface DescriptionProps {
	description: string;
	clickableText: string | undefined;
	number: number;
	onClose: () => void;
	isMainnetTokenDetectionEnabled: boolean;
	network: string;
}

const Description = (props: DescriptionProps) => {
	const { description, clickableText, number, onClose, isMainnetTokenDetectionEnabled, network } = props;
	const { colors } = useAppThemeFromContext() || mockTheme;
	const styles = createStyles(colors);
	const navigation = useNavigation();

	const handlePress = useCallback(() => {
		if (number === 2) {
			Linking.openURL(strings('network_information.learn_more_url'));
		} else {
			onClose();
			navigation.navigate('AddAsset', { assetType: 'token' });
		}
	}, [navigation, onClose, number]);

	const handleNavigation = useCallback(() => {
		onClose();
		navigation.navigate('ExperimentalSettings');
	}, [navigation, onClose]);

	return (
		<View style={styles.descriptionContainer}>
			<View style={styles.contentContainer}>
				<Text style={styles.numberStyle}>{number}.</Text>
				<Text style={styles.description}>
					<Text>{`${description} `}</Text>
					{clickableText && (
						<>
							{!isMainnetTokenDetectionEnabled && network === MAINNET && (
								<>
									<Text style={styles.link} onPress={handleNavigation}>
										{`${strings('network_information.enable_token_detection')} `}
									</Text>
									{`${strings('network_information.or')} `}
								</>
							)}
							<Text style={styles.link} onPress={handlePress}>
								{clickableText}
							</Text>
						</>
					)}
				</Text>
			</View>
		</View>
	);
};

export default memo(Description);
