import { Note } from '@/app/context/notes/entities/note';
import { NotesContext } from '@/app/context/notes/state/notes.cubit';
import SizedBox from '@/components/sizedbox';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { Link, router} from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

export default function NewNoteModal() {
  const isPresented = router.canGoBack();

  const notesCubit = React.useContext(NotesContext);

  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      notesCubit!.addNote(new Note(newNote));  // Adiciona a nova nota
      setNewNote('');  // Limpa o campo de texto
      router.back();  // Fecha o modal (volta para a tela anterior)
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your note"
        value={newNote}
        onChangeText={setNewNote}  // Atualiza o estado com o texto digitado
      />
      <SizedBox height={50}/>
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <FontAwesome name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Add note</Text>
      </TouchableOpacity>
      
      {!isPresented && <Link href="../">Dismiss modal</Link>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
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
    elevation: 5, // Efeito de sombra
  },
  addButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});