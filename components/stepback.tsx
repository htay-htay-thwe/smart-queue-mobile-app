import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function StepBack() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <IconButton
      icon="arrow-left"
      size={24}
      onPress={handleBackPress}
      iconColor="#000"
      style={{ margin: 0, padding: 0 }}
    />
  );
}
