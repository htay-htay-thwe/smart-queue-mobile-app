import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

interface FooterProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
}

export default function Footer({ activeTab = "home", onNavigate }: FooterProps) {
  const handlePress = (tab: string) => {
    console.log(`${tab} pressed`);
    onNavigate?.(tab);
  };

  return (
    <View 
      className="bg-white border-t border-gray-200"
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 8,
        paddingBottom: 12,
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          icon="home"
          size={24}
          iconColor={activeTab === "home" ? "#000" : "#666"}
          onPress={() => handlePress('home')}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={{ 
          fontSize: 11, 
          color: activeTab === "home" ? "#000" : "#666", 
          fontWeight: activeTab === "home" ? "500" : "400",
          marginTop: -8
        }}>
          Home
        </Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          icon="qrcode-scan"
          size={24}
          iconColor={activeTab === "qr" ? "#000" : "#666"}
          onPress={() => handlePress('qr')}
          style={{ margin: 0, padding: 0 }}
          
        />
        <Text style={{ 
          fontSize: 11, 
          color: activeTab === "qr" ? "#000" : "#666",
          fontWeight: activeTab === "qr" ? "500" : "400",
          marginTop: -8
        }}>
          QR Code
        </Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          icon="clock-outline"
          size={24}
          iconColor={activeTab === "queues" ? "#000" : "#666"}
          onPress={() => handlePress('queues')}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={{ 
          fontSize: 11, 
          color: activeTab === "queues" ? "#000" : "#666",
          fontWeight: activeTab === "queues" ? "500" : "400",
          marginTop: -8
        }}>
          My Queues
        </Text>
      </View>
    </View>
  );
}
