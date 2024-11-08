import { Note } from '@/app/context/notes/entities/note';
import { NotesContext } from '@/app/context/notes/state/notes.cubit';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const notesCubit = React.useContext(NotesContext);

  const [notes, updateNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Se inscreve no stream de mudanças de estado
    const subscription = notesCubit!.stream().subscribe(updateNotes);

    // Limpeza da inscrição ao desmontar o componente
    return () => {
      subscription.unsubscribe();
    };
  }, [])

  const renderNote = ({ item }: { item: Note }) => {
    return (
      <View style={styles.noteItem}>
        <Text style={styles.noteText}>{item.content()}</Text>
        <TouchableOpacity 
          style={styles.checkButton}
          onPress={() => checkNote(item)}>
          <FontAwesome name="check" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const checkNote = (note: Note) => {
    notesCubit?.removeNote(note);
  };

  return (
    <View style={styles.container}>
    {notes.length === 0 ? (
        <View style={styles.noNotesContainer}>
          <Text style={styles.noNotesText}>No notes available</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(note) => note.id()}
          contentContainerStyle={styles.notesList}
        />
      )}
    </View>
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
    paddingBottom: 40, // Espaço extra para o botão
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
    elevation: 2, // Para efeito de sombra no Android
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1, // Para permitir que o texto ocupe o espaço disponível
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,  // Tamanho fixo para a largura
    height: 30, // Tamanho fixo para a altura (igual à largura)
    borderRadius: 20, // Faz o botão ficar redondo
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
