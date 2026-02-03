import { View, Image } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  distance: string;
  waitInfo: string;
  image: any;
}

interface Props {
  restaurant: Restaurant;
  onJoinQueue?: (id: string) => void;
}

export default function RestaurantCard({ restaurant, onJoinQueue }: Props) {
  const { id, name, cuisine, distance, waitInfo, image } = restaurant;
  const navigation = useNavigation();

  const handleJoinQueue = () => {
    if (onJoinQueue) {
      onJoinQueue(id);
    } else {
      (navigation.navigate as any)('JoinQueue', { restaurant });
    }
  };

  return (
    <View 
      style={{
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: 'white',
        borderWidth: 2.5,
        borderColor: '#17a2b8',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        overflow: 'hidden',
        height: 140,
      }}
    >
      {/* Left: Image */}
      <View style={{ width: 110, height: 140, backgroundColor: '#E5E7EB' }}>
        <Image
          source={image}
          style={{ width: 110, height: 140 }}
          resizeMode="cover"
        />
      </View>

      {/* Right: Content */}
      <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 2, justifyContent: 'space-between' }}>
        {/* Top section: Texts */}
        <View>
          <Text 
            variant="titleMedium" 
            style={{ fontWeight: '600', color: '#111827', fontSize: 15 }}
            numberOfLines={2}
          >
            {name}
          </Text>

          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
            {cuisine} • {distance}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <IconButton
              icon="account-group"
              size={14}
              iconColor="#6B7280"
              style={{ margin: 0, padding: 0, marginLeft: -4 }}
            />
            <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 2 }}>
              {waitInfo} in queue
            </Text>
          </View>
        </View>

        {/* Bottom section: Button */}
        <Button
          mode="contained"
          onPress={handleJoinQueue}
          style={{
            borderRadius: 20,
            backgroundColor: '#17a2b8',
            alignSelf: 'flex-start',
            marginBottom: 6,
          }}
          contentStyle={{
            paddingHorizontal: 12,
            paddingVertical: 0,
          }}
          labelStyle={{
            fontSize: 11,
            fontWeight: '600',
          }}
        >
          Join Queue
        </Button>
      </View>
    </View>
  );
}
