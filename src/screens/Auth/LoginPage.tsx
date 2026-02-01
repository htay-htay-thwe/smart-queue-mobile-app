import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export function LoginPage() {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View className="items-center justify-center flex-1 p-4 ">
                <Card>
                    <Card.Content style={{ gap: 16 }}>
                        <Text variant="titleLarge">🎫 Smart Queue System</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6B7280' }}>Current Queue: 12</Text>
                        <Button mode="contained" >
                            Take Queue
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}