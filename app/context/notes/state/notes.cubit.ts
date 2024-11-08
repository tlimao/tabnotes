import { Cubit } from 'cubit-ts';
import { createContext } from 'react';
import { Note } from '../entities/note';
import LocalStorage from '@/app/storage/storage';

export class NotesCubit extends Cubit<Note[]> {
    
    constructor(state: Note[]) {
        super(state);
    }

    public async loadNotes(): Promise<void> {
        const notes: Note[] = await LocalStorage.loadNotes();
        this.emit(notes);
    }

    public addNote(note: Note): void {
        const new_list: Note[] = [...this.state(), note];
        LocalStorage.addNote(note);
        this.emit(new_list);
    }

    public removeNote(note: Note): void {
        const new_list: Note[] = this.state().filter(
            (value) => value.content() != note.content());
        LocalStorage.removeNoteById(note.id());
        this.emit(new_list);
    }

    public updateOrder(notes: Note[]): void {
        this.emit(notes);
        LocalStorage.updateNotesOrder(notes);
    }
}

export const NotesContext = createContext<NotesCubit | null>(null);