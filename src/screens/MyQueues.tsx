import { ScrollView, View, Text } from "react-native";
import { Card, Button, IconButton, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "components/footer";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Queue {
  id: string;
  restaurantName: string;
  queueNumber?: string;
  partySize?: number;
  queueType?: string;
  position?: number;
  totalPeople?: number;
  estimatedWait: string;
  joinedAt: string;
  status: "active" | "ready" | "expired";
  phone?: string;
  notes?: string;
}

export default function MyQueuesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const [queues, setQueues] = useState<Queue[]>([]);

  // Load queues from AsyncStorage on mount
  useEffect(() => {
    loadQueues();
  }, []);

  const loadQueues = async () => {
    try {
      const storedQueues = await AsyncStorage.getItem('@queues');
      if (storedQueues) {
        setQueues(JSON.parse(storedQueues));
      }
    } catch (error) {
      console.error('Error loading queues:', error);
    }
  };

  const saveQueues = async (newQueues: Queue[]) => {
    try {
      await AsyncStorage.setItem('@queues', JSON.stringify(newQueues));
      setQueues(newQueues);
    } catch (error) {
      console.error('Error saving queues:', error);
    }
  };

  // Add new queue when navigating from Display page
  useEffect(() => {
    const addNewQueue = async () => {
      const newQueue = (route.params as any)?.newQueue;
      if (newQueue) {
        try {
          // Load current queues from AsyncStorage to ensure we have the latest data
          const storedQueues = await AsyncStorage.getItem('@queues');
          const currentQueues = storedQueues ? JSON.parse(storedQueues) : [];
          const updatedQueues = [newQueue, ...currentQueues];
          await saveQueues(updatedQueues);
          // Clear the param to avoid re-adding on re-render
          navigation.setParams({ newQueue: undefined } as never);
        } catch (error) {
          console.error('Error adding new queue:', error);
        }
      }
    };
    addNewQueue();
  }, [route.params]);

  const [historyQueues] = useState<Queue[]>([
    {
      id: "3",
      restaurantName: "Thai Restaurant",
      position: 0,
      totalPeople: 0,
      estimatedWait: "Completed",
      joinedAt: "Yesterday",
      status: "expired",
    },
    {
      id: "4",
      restaurantName: "Sushi Place",
      position: 0,
      totalPeople: 0,
      estimatedWait: "Completed",
      joinedAt: "2 days ago",
      status: "expired",
    },
  ]);

  const handleNavigate = (tab: string) => {
    if (tab === 'home') {
      navigation.navigate('HomePage' as never);
    } else if (tab === 'qr') {
      navigation.navigate('QRScan' as never);
    } else if (tab === 'queues') {
      navigation.navigate('MyQueues' as never);
    }
  };

  const cancelQueue = async (id: string) => {
    const updatedQueues = queues.filter((queue) => queue.id !== id);
    await saveQueues(updatedQueues);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#17a2b8";
      case "ready":
        return "#28a745";
      case "expired":
        return "#6c757d";
      default:
        return "#000";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "In Queue";
      case "ready":
        return "Ready";
      case "expired":
        return "Completed";
      default:
        return status;
    }
  };

  const displayQueues = activeTab === "active" ? queues : historyQueues;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header */}
      <View className="bg-white border-b border-gray-200">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 8,
            minHeight: 56,
          }}
        >
          <View style={{ width: 40 }} />
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#111827" }}>
            My Queues
          </Text>
          <IconButton
            icon="bell-outline"
            size={24}
            onPress={() => navigation.navigate("Notifications" as never)}
            iconColor="#000"
            style={{ margin: 0, padding: 0 }}
          />
        </View>
      </View>

      {/* Tab Chips */}
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View style={{ flexDirection: "row", gap: 10, marginLeft: 15 }}>
          <Chip
            selected={activeTab === "active"}
            showSelectedCheck={false}
            onPress={() => setActiveTab("active")}
            mode="flat"
            style={{
              backgroundColor: activeTab === "active" ? "#17a2b8" : "#f5f5f5",
            }}
            textStyle={{
              color: activeTab === "active" ? "white" : "#666",
              fontSize: 14,
            }}
          >
            Active ({queues.length})
          </Chip>
          <Chip
            selected={activeTab === "history"}
            showSelectedCheck={false}
            onPress={() => setActiveTab("history")}
            mode="flat"
            style={{
              backgroundColor: activeTab === "history" ? "#17a2b8" : "#f5f5f5",
            }}
            textStyle={{
              color: activeTab === "history" ? "white" : "#666",
              fontSize: 14,
            }}
          >
            History
          </Chip>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        >
          {displayQueues.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 60,
              }}
            >
              <IconButton
                icon="clock-outline"
                size={64}
                iconColor="#d1d5db"
                style={{ margin: 0 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#9ca3af",
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                {activeTab === "active"
                  ? "No active queues"
                  : "No queue history"}
              </Text>
              {activeTab === "active" && (
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate("QRScan" as never)}
                  style={{
                    marginTop: 20,
                    backgroundColor: "#17a2b8",
                    borderRadius: 20,
                  }}
                >
                  Scan QR Code
                </Button>
              )}
            </View>
          ) : (
            displayQueues.map((queue) => (
              <Card
                key={queue.id}
                style={{
                  marginBottom: 16,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
              >
                <Card.Content>
                  {/* Restaurant Name & Status */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#111827",
                        flex: 1,
                      }}
                    >
                      {queue.restaurantName}
                    </Text>
                    <Chip
                      style={{
                        backgroundColor: `${getStatusColor(queue.status)}20`,
                      }}
                      textStyle={{
                        color: getStatusColor(queue.status),
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {getStatusText(queue.status)}
                    </Chip>
                  </View>

                  {/* Queue Info */}
                  {queue.status !== "expired" && (
                    <View style={{ marginBottom: 16 }}>
                      {/* Queue Number */}
                      {queue.queueNumber && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <IconButton
                            icon="ticket"
                            size={18}
                            iconColor="#6b7280"
                            style={{ margin: 0, padding: 0 }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#6b7280",
                              marginLeft: 4,
                            }}
                          >
                            Queue Number: {queue.queueNumber}
                          </Text>
                        </View>
                      )}

                      {/* Party Size */}
                      {queue.partySize && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <IconButton
                            icon="account-group"
                            size={18}
                            iconColor="#6b7280"
                            style={{ margin: 0, padding: 0 }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#6b7280",
                              marginLeft: 4,
                            }}
                          >
                            Party Size: {queue.partySize} {queue.partySize === 1 ? 'person' : 'people'}
                          </Text>
                        </View>
                      )}

                      {/* Position (for old queues) */}
                      {!queue.queueNumber && queue.position !== undefined && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <IconButton
                            icon="account-group"
                            size={18}
                            iconColor="#6b7280"
                            style={{ margin: 0, padding: 0 }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#6b7280",
                              marginLeft: 4,
                            }}
                          >
                            Position: {queue.position} of {queue.totalPeople}
                          </Text>
                        </View>
                      )}

                      {/* Estimated Wait */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <IconButton
                          icon="clock-outline"
                          size={18}
                          iconColor="#6b7280"
                          style={{ margin: 0, padding: 0 }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#6b7280",
                            marginLeft: 4,
                          }}
                        >
                          Estimated wait: {queue.estimatedWait}
                        </Text>
                      </View>

                      {/* Joined At */}
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IconButton
                          icon="calendar"
                          size={18}
                          iconColor="#6b7280"
                          style={{ margin: 0, padding: 0 }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#6b7280",
                            marginLeft: 4,
                          }}
                        >
                          Joined at: {queue.joinedAt}
                        </Text>
                      </View>
                    </View>
                  )}

                  {queue.status === "expired" && (
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 14, color: "#6b7280" }}>
                        Completed on {queue.joinedAt}
                      </Text>
                    </View>
                  )}

                  {/* Actions */}
                  {activeTab === "active" && (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        marginTop: 8,
                      }}
                    >
                      <Button
                        mode="contained"
                        onPress={() => (navigation.navigate as any)('ViewLive', {
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
                        })}
                        style={{
                          flex: 1,
                          backgroundColor: "#17a2b8",
                          borderRadius: 20,
                        }}
                      >
                        View Live
                      </Button>
                      {queue.status === "ready" ? (
                        <Button
                          mode="contained"
                          onPress={() => console.log("Proceeding to counter")}
                          style={{
                            flex: 1,
                            backgroundColor: "#28a745",
                            borderRadius: 20,
                          }}
                        >
                          I'm Here
                        </Button>
                      ) : (
                        <Button
                          mode="outlined"
                          onPress={() => cancelQueue(queue.id)}
                          style={{
                            flex: 1,
                            borderColor: "#dc3545",
                            borderRadius: 20,
                          }}
                          textColor="#dc3545"
                        >
                          Cancel
                        </Button>
                      )}
                    </View>
                  )}
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      </View>

      {/* Footer */}
      <Footer activeTab="My Queues" onNavigate={handleNavigate} />
    </SafeAreaView>
  );
}
