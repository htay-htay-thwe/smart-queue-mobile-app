import { ScrollView, View, Text } from "react-native";
import { Provider as PaperProvider, Searchbar, Chip, IconButton } from "react-native-paper";
import RestaurantCard from "components/restaurantscards";
import Footer from "components/footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantListScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "European", "Fast Food", "Burmese", "Thai"];

  const allRestaurants = [
    {
      id: "1",
      name: "Zhengxin Chicken Steak",
      cuisine: "Fast Food",
      distance: "1.4 km",
      waitInfo: "12",
      image: require("../images/ZhengXin.png"),
    },
    {
      id: "2",
      name: "Martini Cafe",
      cuisine: "European",
      distance: "1.4 km",
      waitInfo: "8",
      image: require("../images/Martini.webp"),
    },
    {
      id: "3",
      name: "Ah May Eain",
      cuisine: "Burmese",
      distance: "750 m",
      waitInfo: "5",
      image: require("../images/Ah May Eain.jpg"),
    },
    {
      id: "4",
      name: "คุณหนึ่งก๋วยเตี๋ยวไก่มะพร้าว",
      cuisine: "Thai",
      distance: "1.3 km",
      waitInfo: "8",
      image: require("../images/Thai.jpg"),
    },
  ];

  const filteredRestaurants = selectedCategory === "All" 
    ? allRestaurants 
    : allRestaurants.filter((restaurant) => restaurant.cuisine === selectedCategory);

  return (
    <PaperProvider>
      {/* 1. SafeAreaView needs flex: 1 to fill the screen */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        
        {/* 2. Content Container: Takes all space ABOVE the footer (flex: 1) */}
        <View style={{ flex: 1 }}> 
          
          {/* Header */}
          <View className="bg-white border-b border-gray-200">
            <View 
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 8,
                minHeight: 56
              }}
            >
              <IconButton
                icon="menu"
                size={24}
                onPress={() => console.log("Menu pressed")}
                iconColor="#000"
                style={{ margin: 0, padding: 0 }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827' }}>
                Smart Queue
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

          {/* Search Bar */}
          <View className="px-4 py-3 bg-white">
            <Searchbar
              placeholder="Search restaurants..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              onSubmitEditing={() => {
                (navigation.navigate as any)('search', { query: searchQuery });
              }}
              onFocus={() => {
                (navigation.navigate as any)('search', { query: searchQuery });
              }}
              style={{ backgroundColor: "#F5F5F5", borderRadius: 20, marginLeft:15, marginRight:15 }}
              elevation={0}
              iconColor="#00000"
            />
          </View>

          {/* Category Chips */}
          <View className="bg-white pb-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 10, paddingVertical:12 }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  selected={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                  mode="flat"
                  showSelectedCheck={false}
                  style={{
                    backgroundColor:
                      selectedCategory === category ? "#17a2b8" : "#F5F5F5",
                    borderRadius: 20,
                    height: 32
                  }}
                  textStyle={{
                    color: selectedCategory === category ? "#FFFFFF" : "#666666",
                    fontSize: 13,
                    fontWeight: selectedCategory === category ? "600" : "400",
                  }}
                >
                  {category}
                </Chip>
              ))}
            </ScrollView>
          </View>

          <ScrollView
            style={{ flex: 1 }} 
            contentContainerStyle={{ paddingBottom: 16, paddingTop: 15, paddingHorizontal: 16 }}
            className="bg-white"
          >
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </ScrollView>
        </View>

        {/* 4. Footer sits outside the content View (no flex, so it stays fixed size) */}
        <View style={{ backgroundColor: 'white' }}>
          <Footer
            activeTab="home"
            onNavigate={(tab) => {
              if (tab === 'qr') {
                navigation.navigate('QRScan' as never);
              } else if (tab === 'home') {
                navigation.navigate('HomePage' as never);
              } else if (tab === 'queues') {
                navigation.navigate('MyQueues' as never);
              }
            }}
          />
        </View>

      </SafeAreaView>
    </PaperProvider>
  );
}