import './style/style.css';

const notesData = [
    {
        id: 'notes-jT-jjsyz61J8XKiI',
        title: 'Welcome to Notes, Dimas!',
        body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
        createdAt: '2022-07-28T10:03:12.594Z',
        archived: false,
    },
    {
        id: 'notes-aB-cdefg12345',
        title: 'Meeting Agenda',
        body: 'Discuss project updates and assign tasks for the upcoming week.',
        createdAt: '2022-08-05T15:30:00.000Z',
        archived: false,
    },
    {
        id: 'notes-XyZ-789012345',
        title: 'Shopping List',
        body: 'Milk, eggs, bread, fruits, and vegetables.',
        createdAt: '2022-08-10T08:45:23.120Z',
        archived: false,
    },
    {
        id: 'notes-1a-2b3c4d5e6f',
        title: 'Personal Goals',
        body: 'Read two books per month, exercise three times a week, learn a new language.',
        createdAt: '2022-08-15T18:12:55.789Z',
        archived: false,
    },
    {
        id: 'notes-LMN-456789',
        title: 'Recipe: Spaghetti Bolognese',
        body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
        createdAt: '2022-08-20T12:30:40.200Z',
        archived: false,
    },
    {
        id: 'notes-QwErTyUiOp',
        title: 'Workout Routine',
        body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
        createdAt: '2022-08-25T09:15:17.890Z',
        archived: false,
    },
    {
        id: 'notes-abcdef-987654',
        title: 'Book Recommendations',
        body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
        createdAt: '2022-09-01T14:20:05.321Z',
        archived: false,
    },
    {
        id: 'notes-zyxwv-54321',
        title: 'Daily Reflections',
        body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
        createdAt: '2022-09-07T20:40:30.150Z',
        archived: false,
    },
    {
        id: 'notes-poiuyt-987654',
        title: 'Travel Bucket List',
        body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
        createdAt: '2022-09-15T11:55:44.678Z',
        archived: false,
    },
    {
        id: 'notes-asdfgh-123456',
        title: 'Coding Projects',
        body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
        createdAt: '2022-09-20T17:10:12.987Z',
        archived: false,
    },
    {
        id: 'notes-5678-abcd-efgh',
        title: 'Project Deadline',
        body: 'Complete project tasks by the deadline on October 1st.',
        createdAt: '2022-09-28T14:00:00.000Z',
        archived: false,
    },
    {
        id: 'notes-9876-wxyz-1234',
        title: 'Health Checkup',
        body: 'Schedule a routine health checkup with the doctor.',
        createdAt: '2022-10-05T09:30:45.600Z',
        archived: false,
    },
    {
        id: 'notes-qwerty-8765-4321',
        title: 'Financial Goals',
        body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
        createdAt: '2022-10-12T12:15:30.890Z',
        archived: false,
    },
    {
        id: 'notes-98765-54321-12345',
        title: 'Holiday Plans',
        body: 'Research and plan for the upcoming holiday destination.',
        createdAt: '2022-10-20T16:45:00.000Z',
        archived: false,
    },
    {
        id: 'notes-1234-abcd-5678',
        title: 'Language Learning',
        body: 'Practice Spanish vocabulary for 30 minutes every day.',
        createdAt: '2022-10-28T08:00:20.120Z',
        archived: false,
    },
];

const apiUrl = 'https://notes-api.dicoding.dev/v2';

const form = document.querySelector('form');
const inputTitle = form.elements.notesTitle;
const inputBody = form.elements.notesBody;
let customNotes;

form.addEventListener('submit', (event) => event.preventDefault());

const customValidationHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Wajib diisi.');
    return;
  }
};

inputTitle.addEventListener('change', customValidationHandler);
inputTitle.addEventListener('invalid', customValidationHandler);

inputBody.addEventListener('change', customValidationHandler);
inputBody.addEventListener('invalid', customValidationHandler);

inputTitle.addEventListener('blur', handleValidation);
inputBody.addEventListener('blur', handleValidation);

function handleValidation(event) {
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl) {
    if (errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const notesForm = document.getElementById('notesForm');
  customNotes = document.querySelector('custom-notes');

  notesForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = inputTitle.value;
    const body = inputBody.value;

    const newNote = {
      title,
      body,
    };

    try {
      const createdNote = await addNote(newNote);
      const updatedNotes = await getNotes();
      customNotes.updateList(updatedNotes);
    } catch (error) {
      console.error('Error:', error);
    }
  });

    async function addNote(note) {
    const response = await fetch(`${apiUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        body: note.body,
      }),
    });
  
    const data = await response.json();
    return data;
  }


  customNotes.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
      const noteId = event.target.dataset.noteId;
      try {
        await deleteNote(noteId);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  const loadingIndicator = document.createElement('loading-indicator');
    document.body.appendChild(loadingIndicator);
    loadingIndicator.show();
    
    getNotes().then((notes) => {
    customNotes.updateList(notes);
    loadingIndicator.hide();
  });
});

async function getNotes() {
    try {
      const response = await fetch(`${apiUrl}/notes`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
}

async function deleteNote(noteId) {
    const response = await fetch(`${apiUrl}/notes/${noteId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    // Panggil getNotes untuk mengambil daftar yang diperbarui setelah penghapusan
    const updatedNotes = await getNotes();
    
    // Periksa apakah customNotes terdefinisi sebelum memanggil updateList
    if (customNotes !== undefined) {
        customNotes.updateList(updatedNotes);
    } else {
        console.error('Error: customNotes is undefined');
    }
}

class HeaderBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const title = this.getAttribute('title');
    this.shadowRoot.innerHTML = `
      <style>
        h1 {
          margin: 0;
          color: #ffffff;
        }
      </style>
      <h1>Notes Apps</h1>
    `;
  }
}

customElements.define('header-bar', HeaderBar);

class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .loading-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            z-index: 9999;
            justify-content: center;
            align-items: center;
          }
  
          .loading-spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <div class="loading-container">
          <div class="loading-spinner"></div>
        </div>
      `;
    }
  
    show() {
      const loadingContainer = this.shadowRoot.querySelector('.loading-container');
      loadingContainer.style.display = 'flex';
    }
  
    hide() {
      const loadingContainer = this.shadowRoot.querySelector('.loading-container');
      loadingContainer.style.display = 'none';
    }
  }
  
  customElements.define('loading-indicator', LoadingIndicator);

class CustomNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.updateList([]);
  }

  updateList(notes) {
    this.shadowRoot.innerHTML = `
      <style>
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 40px 60px;
          justify-items: center;
          padding: 20px;
          border-radius: 20px;
          justify-content: space-between;
        }

        .notes {
          border: 1px solid black;
          border-radius: 5px;
          padding: 20px;
          background-color: #ffffff;
          color: black;
          width: 100%;
          position: relative;
        }

        .notes h2 {
          margin-top: 0;
          color: #e65908;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .button-container button {
          background-color: #fa650e;
          color: white;
          padding: 5px 10px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }

        .button-container button:hover {
          background-color: #d95e0e;
        }
      </style>
    `;
    const notesDataElement = document.createElement('div');
    notesDataElement.classList.add('notes-grid');

    notes.forEach((note) => {
      if (!note.archived) {
        const notesElement = document.createElement('div');
        notesElement.classList.add('notes');

        const titleElement = document.createElement('h2');
        titleElement.textContent = note.title;

        const bodyElement = document.createElement('p');
        bodyElement.textContent = note.body;

        const createdAtElement = document.createElement('p');
        const createdAtDate = new Date(note.createdAt);
        const createdAtDateString = createdAtDate.toLocaleString();
        createdAtElement.textContent = `Created At: ${createdAtDateString}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.noteId = note.id;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(deleteButton);

        notesElement.appendChild(titleElement);
        notesElement.appendChild(bodyElement);
        notesElement.appendChild(createdAtElement);
        notesElement.appendChild(buttonContainer);

        notesDataElement.appendChild(notesElement);
      }
    });

    this.shadowRoot.appendChild(notesDataElement);

    this.shadowRoot.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
          const noteId = event.target.dataset.noteId;
          try {
            await deleteNote(noteId);
          } catch (error) {
            console.error('Error:', error);
          }
        });
      });
  }
}

customElements.define('custom-notes', CustomNotes);

class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const text = this.getAttribute('text');
    this.shadowRoot.innerHTML = `
      <div>
        Notes App &copy; 2024
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);