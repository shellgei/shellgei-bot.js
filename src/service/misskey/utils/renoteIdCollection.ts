let noteIds: string[] = []

const setNoteIds = (noteId: string) => {
  const newNoteIds = [noteId, ...noteIds];
  noteIds = newNoteIds.slice(0, 100)

}

const existNoteId = (noteId: string): boolean => noteIds.includes(noteId)


export {
  setNoteIds,
  existNoteId
}