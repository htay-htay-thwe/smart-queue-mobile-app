import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, Avatar, Divider, IconButton } from 'react-native-paper';
import { useUser } from '../../context/UserContext';

type Props = {
  navigation: any;
  route: any;
};

const AccountView = ({ navigation, route }: Props) => {
  const { email: userEmail, username: userName } = useUser();
  const [username, setUsername] = useState(userName || '');
  const [email, setEmail] = useState(userEmail || '');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
    if (userName) {
      setUsername(userName);
    }
  }, [userEmail, userName]);

  useEffect(() => {
    if (route.params?.username) {
      setUsername(route.params.username);
    }
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.username, route.params?.email]);
  
  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleEditProfile = () => {
    setMenuVisible(false);
    navigation.navigate('EditProfile');
  };

  const handleHistory = () => {
    setMenuVisible(false);
    console.log('History pressed');
  };

  const handleLogout = () => {
    setMenuVisible(false);
    console.log('Logout pressed');
    navigation.navigate('Login');
  };

  const handleSettings = () => {
    console.log('Settings pressed');
    navigation.navigate('Settings');
  };

  const handleSupport = () => {
    console.log('Support pressed');
    navigation.navigate('Support');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <IconButton
          icon="menu"
          size={28}
          iconColor="#000"
          onPress={handleMenuPress}
          style={styles.menuButton}
        />
      </View>

      {/* Popup Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.popupMenu}>
            <TouchableOpacity style={styles.popupMenuItem} onPress={handleEditProfile}>
              <IconButton
                icon="account"
                size={24}
                iconColor="#1A80A4"
                style={styles.popupMenuIcon}
              />
              <Text style={styles.popupMenuText}>Edit Profile</Text>
            </TouchableOpacity>

            <Divider style={styles.popupDivider} />

            <TouchableOpacity style={styles.popupMenuItem} onPress={handleHistory}>
              <IconButton
                icon="clock-outline"
                size={24}
                iconColor="#1A80A4"
                style={styles.popupMenuIcon}
              />
              <Text style={styles.popupMenuText}>History</Text>
            </TouchableOpacity>

            <Divider style={styles.popupDivider} />

            <TouchableOpacity style={styles.popupMenuItem} onPress={handleLogout}>
              <IconButton
                icon="logout"
                size={24}
                iconColor="#1A80A4"
                style={styles.popupMenuIcon}
              />
              <Text style={styles.popupMenuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Avatar.Icon
            size={70}
            icon="account"
            style={styles.avatar}
            color="#fff"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />
      </ScrollView>

      {/* Footer Section - Fixed at Bottom */}
      <View style={styles.footerSection}>
        <Divider style={styles.footerDivider} />
        
        {/* Settings */}
        <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
          <View style={styles.menuItemLeft}>
            <IconButton
              icon="cog-outline"
              size={24}
              iconColor="#1A80A4"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Settings</Text>
          </View>
          <IconButton
            icon="chevron-right"
            size={24}
            iconColor="#999"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        <Divider style={styles.menuDivider} />

        {/* Support */}
        <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
          <View style={styles.menuItemLeft}>
            <IconButton
              icon="help-circle-outline"
              size={24}
              iconColor="#1A80A4"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Support</Text>
          </View>
          <IconButton
            icon="chevron-right"
            size={24}
            iconColor="#999"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  menuButton: {
    margin: 0,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  avatar: {
    backgroundColor: '#1A80A4',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
  menuList: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    margin: 0,
    marginRight: 0,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  chevronIcon: {
    margin: 0,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 72,
    marginRight: 20,
  },
  footerSection: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 20,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingLeft: 20,
  },
  popupMenu: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 250,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  popupMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  popupMenuIcon: {
    margin: 0,
    marginRight: 5,
  },
  popupMenuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  popupDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 10,
  },
});

export default AccountView;
