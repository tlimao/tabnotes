import { Note } from '@/app/context/notes/entities/note';
import { NotesContext } from '@/app/context/notes/state/notes.cubit';
import SizedBox from '@/components/sizedbox';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function NotesScreen() {
  const notesCubit = useContext(NotesContext);

  const [notes, setNotes] = useState<Note[]>([]);

  const handleNewNote = () => {
    router.push('/(notes)/new_note_modal');
  };

  useEffect(() => {
    // Se inscreve no stream de mudanças de estado
    const subscription = notesCubit!.stream().subscribe(setNotes);

    // Limpeza da inscrição ao desmontar o componente
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const renderNote = ({ item, drag, isActive }: RenderItemParams<Note>) => {
    return (
      <TouchableOpacity
        style={[
          styles.noteItem,
          isActive ? { backgroundColor: '#e0e0e0' } : {}, // Estilo ao arrastar
        ]}
        onLongPress={drag}
      >
        <Text style={styles.noteText}>{item.content()}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeNote(item)}
        >
          <FontAwesome name="minus" size={20} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const removeNote = (note: Note) => {
    notesCubit?.removeNote(note);
  };

  const handleDragEnd = ({ data }: { data: Note[] }) => {
    notesCubit?.updateOrder(data); // Atualiza a ordem no contexto, se necessário
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {notes.length === 0 ? (
          <View style={styles.noNotesContainer}>
            <Text style={styles.noNotesText}>No notes available</Text>
          </View>
        ) : (
          <DraggableFlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(note) => note.id()}
            onDragEnd={handleDragEnd}
            contentContainerStyle={styles.notesList}
          />
        )}
        <SizedBox height={100} />
        <TouchableOpacity style={styles.addButton} onPress={handleNewNote}>
          <FontAwesome name="plus" size={20} color="white" />
          <Text style={styles.addButtonText}>New note</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  notesList: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 40,
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  noNotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotesText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
