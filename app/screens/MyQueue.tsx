import { ScrollView, View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation, TabActions } from "@react-navigation/native";
import QueueCard from "../../components/QueueCard";
import EmptyState from "../../components/EmptyState";
import TabSelector from "../../components/TabSelector";
import { Queue } from "../../src/constants/mockData";
import { useQueue } from "../../src/context/QueueContext";

export default function MyQueue() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const { activeQueues, historyQueues, removeQueue } = useQueue();

  const handleCancelQueue = (id: string) => {
    removeQueue(id);
  };

  const handleViewLive = (queue: Queue) => {
    (navigation.navigate as any)("ViewLive", { 
      restaurant: {
        name: queue.restaurantName,
        cuisine: queue.queueType || "Restaurant",
      },
      queueData: {
        queueNumber: parseInt(queue.queueNumber || "0"),
        partySize: queue.partySize,
        queueType: queue.queueType,
        joinedAt: queue.joinedAt,
        phone: queue.phone,
        notes: queue.notes,
      },
    });
  };

  const handleImHere = () => {
    console.log("Proceeding to counter");
  };

  const handleScanQRCode = () => {
    navigation.dispatch(TabActions.jumpTo('QRScan'));
  };

  const displayQueues = activeTab === "active" ? activeQueues : historyQueues;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header */}
      <View style={{ backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#e5e7eb" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 8, minHeight: 56 }}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            iconColor="#000"
            style={{ margin: 0, padding: 0 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#111827" }}>
            My Queues
          </Text>
          <IconButton
            icon="bell-outline"
            size={24}
            onPress={() => (navigation.navigate as any)("Notifications")}
            iconColor="#000"
            style={{ margin: 0, padding: 0 }}
          />
        </View>
      </View>

      {/* Tab Selector */}
      <TabSelector
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeCount={activeQueues.length}
      />

      {/* Content */}
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 50, flexGrow: 1 }}>
          {displayQueues.length === 0 ? (
            <EmptyState 
              activeTab={activeTab} 
              onScanQRCode={handleScanQRCode} 
            />
          ) : (
            displayQueues.map((queue) => (
              <QueueCard
                key={queue.id}
                queue={queue}
                onViewLive={() => handleViewLive(queue)}
                onCancel={() => handleCancelQueue(queue.id)}
                onImHere={handleImHere}
                showActions={activeTab === "active"}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
