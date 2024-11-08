import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My notes"
        }}
      />
      <Stack.Screen
        name="new_note_modal"
        options={{
          title: "New note",
          presentation: 'modal'
        }}
      />
    </Stack>
  );
}
