import { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Circle, Path, Rect, Line } from "react-native-svg";
import { BottomNavbar } from "../../components/HomeScreen/BottomNavbar";

// ─── Types ────────────────────────────────────────────────────────────────────
interface User {
  name: string;
  level: number;
  levelTitle: string;
  tags: string[];
  followers: number;
  following: number;
  verified: boolean;
  avatarUrl?: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Avatar({ url, size = 96 }: { url?: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size * 1.2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {url ? (
        <Image source={{ uri: url }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
      ) : (
        <Image
          source={require("../../assets/base-unknown-char.png")}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      )}
    </View>
  );
}
function VerifiedBadge() {
  return (
    <View style={{ marginLeft: 4, alignSelf: 'center' }}>
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <Circle cx="11" cy="11" r="11" fill="#7C3AED" />
        <Path d="M6 11l3.5 3.5L16 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

// ─── Profile Card ─────────────────────────────────────────────────────────────
function ProfileCard({ user }: { user: User }) {
  const [following, setFollowing] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "#111",
        borderRadius: 20,
        paddingTop: 28,
        paddingHorizontal: 20,
        paddingBottom: 24,
      }}
    >
      {/* Back arrow */}
      {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
        }}
        accessibilityLabel="Go back"
      >
        <Text style={{ color: "#FACC15", fontSize: 22 }}>‹</Text>
      </TouchableOpacity> */}

      {/* Avatar row */}
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Avatar url={user.avatarUrl} size={180} />
      </View>

      {/* Name + verified */}
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 6 }}>
        <Text style={{ fontSize: 22, fontFamily: "Chillax-Bold", color: "#fff", marginRight: 6 }}>{user.name}</Text>
        {user.verified && <VerifiedBadge />}
      </View>

      {/* Level badge */}
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#4ADE80" }} />
          <Text style={{ color: "#4ADE80", fontFamily: "Chillax-Semibold", fontSize: 14 }}>
            LEVEL {user.level} • {user.levelTitle}
          </Text>
        </View>
      </View>

      {/* Tags */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ color: "#ccc", fontFamily: "Chillax-Regular", fontSize: 14 }}>
          {user.tags.join(" | ")}
        </Text>
      </View>

      {/* Action buttons */}
      {/* <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          onPress={() => setFollowing((f) => !f)}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "#7C3AED",
            backgroundColor: following ? "#7C3AED" : "transparent",
            alignItems: "center",
          }}
        >
          <Text style={{ color: following ? "#fff" : "#A78BFA", fontFamily: "Chillax-Semibold", fontSize: 15 }}>
            {following ? "✓ Following" : "+ Follow"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "#444",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.8" />
            <Circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" />
            <Line x1="12" y1="2" x2="12" y2="8" stroke="#fff" strokeWidth="1.8" />
            <Line x1="12" y1="16" x2="12" y2="22" stroke="#fff" strokeWidth="1.8" />
            <Line x1="2" y1="12" x2="8" y2="12" stroke="#fff" strokeWidth="1.8" />
            <Line x1="16" y1="12" x2="22" y2="12" stroke="#fff" strokeWidth="1.8" />
          </Svg>
          <Text style={{ color: "#fff", fontFamily: "Chillax-Semibold", fontSize: 15 }}>
            Message
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

// ─── Tile Grid ────────────────────────────────────────────────────────────────
function CharacterTile() {
  return (
    <View
      style={{
        backgroundColor: "#C8F135",
        borderRadius: 16,
        padding: 20,
        flex: 1,
        gap: 10,
      }}
    >
      <Avatar size={52} />
      <View>
        <Text style={{ fontFamily: "Chillax-Bold", fontSize: 17, color: "#111", lineHeight: 20 }}>
          Character{"\n"}Customization
        </Text>
        <Text style={{ fontSize: 13, fontFamily: "Chillax-Regular", color: "#333", marginTop: 6 }}>
          Create and customize your avatar.
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 4,
          paddingVertical: 10,
          backgroundColor: "#111",
          borderRadius: 50,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ color: "#fff", fontFamily: "Chillax-Bold", fontSize: 14 }}>
          Customize
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingsTile() {
  return (
    <View
      style={{
        backgroundColor: "#3B82F6",
        borderRadius: 16,
        padding: 20,
        flex: 1,
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Giant gear icon in background */}
      <View style={{ position: "absolute", top: -10, right: -10, opacity: 0.35 }}>
        <Svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 1,
        }}
      >
        <Text style={{ fontSize: 22, fontFamily: "Chillax-Bold", color: "#111" }}>Settings</Text>
        <Text style={{ fontSize: 22, color: "#111" }}>→</Text>
      </View>
    </View>
  );
}

function UpgradeBanner() {
  return (
    <View
      style={{
        backgroundColor: "#EDE9FE",
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 6 }}>
          <Text style={{ color: "#7C3AED", fontSize: 13, fontFamily: "Chillax-Semibold" }}>
            ✦ The best perks
          </Text>
        </View>
        <Text style={{ fontSize: 20, fontFamily: "Chillax-Bold", color: "#111", lineHeight: 25, marginBottom: 12 }}>
          Unlock all{"\n"}exclusive content
        </Text>
        <TouchableOpacity>
          <Text style={{ color: "#7C3AED", fontFamily: "Chillax-Bold", fontSize: 15 }}>
            Upgrade to Silver →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Diamond / sparkle icon */}
      <Svg width="76" height="76" viewBox="0 0 80 80" fill="none">
        <Path d="M40 8 L44 36 L72 40 L44 44 L40 72 L36 44 L8 40 L36 36 Z" fill="#7C3AED" />
        <Path d="M40 18 L43 37 L62 40 L43 43 L40 62 L37 43 L18 40 L37 37 Z" fill="#A78BFA" />
      </Svg>
    </View>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const defaultUser: User = {
  name: "Your Name",
  level: 1,
  levelTitle: "The Beginner",
  tags: ["Creator", "Dreamer", "Storyteller"],
  followers: 0,
  following: 0,
  verified: true,
};

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 100 }}>
        {/* Back arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#111",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
            alignSelf: "flex-start",
            marginTop: 40,  // ← adjust this number to move it down
          }}
        >
          <Text style={{ color: "#FACC15", fontSize: 22 }}>‹</Text>
        </TouchableOpacity>
        <ProfileCard user={defaultUser} />

        {/* 2-column tile row */}
        <View style={{ flexDirection: "row", gap: 14 }}>
          <CharacterTile />
          <SettingsTile />
        </View>

        <UpgradeBanner />
      </ScrollView>
      <BottomNavbar currentTab="PROFILE" />
    </View>
  );
}