import { FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, VirtualizedList } from "react-native";
import * as Contacts from "expo-contacts";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import * as SMS from "expo-sms";

type ItemProps = {
  id?: string;
  name: string;
  firstName: string;
};

const getItem = (item: ItemProps, index: number) => {
  return {
    id: `${item?.id}-index-${index}`,
    name: item.name,
    firstName: item.firstName,
  };
};

const Item = ({ name, firstName }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.title}>{firstName}</Text>
  </View>
);

export default function TabOneScreen() {
  const [contacts, setContacts] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          setContacts(data?.filter((item) => item?.name));
        }
      }
    })();
  }, []);

  const sendSms = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      const { result } = await SMS.sendSMSAsync(
        ["0123456789"],
        "My sample HelloWorld message from Expo SMS"
      );
      console.log(result);
    } else {
      // misfortune... there's no SMS available on this device
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>Tab One</Text>
      </View>

      <Pressable style={styles.button} onPress={sendSms}>
        <Text style={styles.text}>Send SMS</Text>
      </Pressable>

      <FlatList
        style={{ width: "100%" }}
        data={contacts}
        renderItem={({ item }) => (
          <Item name={item.name} id={item?.id} firstName={item.firstName} />
        )}
        keyExtractor={(item) => item.id}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    backgroundColor: "white",
    height: "auto",
    color: "black",
    width: "100%",
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 5,
  },
});
