import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '@/app/context/notes/entities/note';

const NOTES_KEY = '@notes_key';

export default class LocalStorage {
  
  // Salva uma lista de notas no AsyncStorage
  static async saveNotes(notes: Note[]): Promise<void> {
    try {
      const notesJson = JSON.stringify(notes.map(note => note.toJson())); // Converte para um formato serializável
      await AsyncStorage.setItem(NOTES_KEY, notesJson);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }

  // Carrega as notas do AsyncStorage
  static async loadNotes(): Promise<Note[]> {
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      if (notesJson) {
        const notesArray = JSON.parse(notesJson);
        return notesArray.map((noteData: any) => Note.fromJson(noteData)); // Converte de volta para instâncias de Note
      }
      return [];
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  }

  // Adiciona uma nova nota e atualiza o armazenamento
  static async addNote(newNote: Note): Promise<void> {
    const notes = await LocalStorage.loadNotes();
    console.log("Nota salva");
    notes.push(newNote);
    await LocalStorage.saveNotes(notes);
  }

  // Remove uma nota pelo ID e atualiza o armazenamento
  static async removeNoteById(noteId: string): Promise<void> {
    const notes = await LocalStorage.loadNotes();
    console.log("Nota removida");
    const updatedNotes = notes.filter(note => note.id() !== noteId);
    await LocalStorage.saveNotes(updatedNotes);
  }

  // Atualiza a ordem das notas
  static async updateNotesOrder(updatedNotes: Note[]): Promise<void> {
    await LocalStorage.saveNotes(updatedNotes);
  }

  // Limpa todas as notas
  static async clearAllNotes(): Promise<void> {
    try {
      await AsyncStorage.removeItem(NOTES_KEY);
    } catch (error) {
      console.error('Error clearing notes:', error);
    }
  }
}
