describe('Testing CRUD note-taking app', () => {
  beforeAll(async () => {
    await page.goto('https://elaine-ch.github.io/CSE110-SP24-Lab6-Template/');
  });

  it('No notes on initial page load', async () => {
    const notes = await page.$$('textarea.note');
    expect(notes.length).toBe(0);
  });

  it('Add 1 note', async () => {
    const addNoteButton = await page.$('button.add-note');
    await addNoteButton.click();
    const notes = await page.$$('textarea.note');
    expect(notes.length).toBe(1);
  });

  it('Add text to new note', async () => {
    const newNote = await page.$('textarea.note');
    await newNote.click();
    await page.keyboard.press('t');
    await page.keyboard.press('a');
    await page.keyboard.press('g');
    await page.keyboard.press('o');
    await page.keyboard.press('m');
    await page.keyboard.press('a');
    await page.keyboard.press('g');
    await page.keyboard.press('o');
    const noteText = await (await newNote.getProperty('value')).jsonValue();
    expect(noteText).toBe('tagomago');
  });

  it('Save note and reload, check note', async () => {
    await page.keyboard.press('Tab');
    await page.reload();

    const theNote = await page.$('textarea.note');
    const noteText = await (await theNote.getProperty('value')).jsonValue();
    expect(noteText).toBe('tagomago');
  });

  it('Edit note', async () => {
    const theNote = await page.$('textarea.note');
    await theNote.click();
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('ArrowLeft');
    }
    await page.keyboard.press('Space');
    const noteText = await (await theNote.getProperty('value')).jsonValue();
    expect(noteText).toBe('tago mago');
  });

  it('Delete the note', async () => {
    await page.keyboard.press('Tab');
    const theNote = await page.$('textarea.note');
    await theNote.click({ count: 2 });

    const notes = await page.$$('textarea.note');
    expect(notes.length).toBe(0);
  });

  it('Add multiple notes', async () => {
    const addNoteButton = await page.$('button.add-note');
    for (let i = 0; i < 10; i++) {
        await addNoteButton.click();
    }
    const notes = await page.$$('textarea.note');
    expect(notes.length).toBe(10);
  });
});