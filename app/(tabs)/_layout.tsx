import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { Tabs } from 'expo-router';
import { NotesContext, NotesCubit } from '../context/notes/state/notes.cubit';
import { useEffect, useMemo } from 'react';

export default function TabsLayout() {

  const notesCubit = useMemo(() => new NotesCubit([]), []);

  useEffect(() => {
    // Função para carregar as notas armazenadas localmente
    const loadNotes = async () => {
      await notesCubit.loadNotes();
    };

    loadNotes();
  }, [notesCubit]);
  
  return (
    <NotesContext.Provider value={notesCubit}>
        <Tabs screenOptions={{ 
            title: "Tab notes",
            tabBarActiveTintColor: 'black-gray',
            tabBarInactiveBackgroundColor: 'light-gray'
          }}>
          <Tabs.Screen
            name="(home)"
            options={{ 
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color }) => <FontAwesome size={30} name="check-circle-o" color={color} />
            }}
          />
          <Tabs.Screen
            name="(notes)"
            options={{ 
              title: "My notes",
              headerShown: false,
              tabBarIcon: ({ color }) => <FontAwesome size={30} name="sticky-note-o" color={color} />
            }}
          />
        </Tabs>
      </NotesContext.Provider>
    );
}
