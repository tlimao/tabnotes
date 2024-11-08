import uuid from 'react-native-uuid';

export class Note {

    private readonly _id: string;
    private readonly _content: string;

    constructor(content: string, id?: string) {
        this._id = id || uuid.v4().toString();
        this._content = content;
    }

    public id(): string {
        return this._id;
    }

    public content(): string {
        return this._content;
    }

    public toJson(): { id: string; content: string } {
        return {
            id: this._id,
            content: this._content,
        };
    }

    public static fromJson(json: { id: string; content: string }): Note {
        return new Note(json.content, json.id);
    }
}