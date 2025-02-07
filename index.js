const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');

const newData =  {
    "seminars": [
    {
      "id": 1,
      "title": "Новинки Kosmoteros",
      "description": "Обзор новых средств и методик от Kosmoteros.",
      "date": "01.02.2025",
      "time": "10:00",
      "photo": "https://picsum.photos/id/1/750/730"
    },
    {
      "id": 2,
      "title": "Семинар по инновациям в косметологии",
      "description": "Разбор новейших тенденций в косметологии и трендовых продуктов.",
      "date": "03.02.2025",
      "time": "11:00",
      "photo": "https://picsum.photos/id/2/750/730"
    },
    {
      "id": 3,
      "title": "Технологии ухода за кожей",
      "description": "Изучение современных методик ухода за кожей с применением новейших технологий.",
      "date": "05.02.2025",
      "time": "12:00",
      "photo": "https://picsum.photos/id/3/750/730"
    },
    {
      "id": 4,
      "title": "Актуальные тренды в бьюти-индустрии",
      "description": "Обсуждение современных трендов и методик в бьюти-индустрии.",
      "date": "07.02.2025",
      "time": "13:00",
      "photo": "https://picsum.photos/id/4/750/730"
    },
    {
      "id": 5,
      "title": "Секреты профессионалов Kosmoteros",
      "description": "Семинар с участием ведущих специалистов по использованию средств Kosmoteros.",
      "date": "09.02.2025",
      "time": "14:00",
      "photo": "https://picsum.photos/id/5/750/730"
    },
    {
      "id": 6,
      "title": "Эффективные методики омоложения",
      "description": "Обучение современным методикам омоложения и ухода за кожей.",
      "date": "11.02.2025",
      "time": "15:00",
      "photo": "https://picsum.photos/id/6/750/730"
    },
    {
      "id": 7,
      "title": "Инновационные средства Kosmoteros",
      "description": "Демонстрация новых продуктов Kosmoteros и их уникальных свойств.",
      "date": "13.02.2025",
      "time": "16:00",
      "photo": "https://picsum.photos/id/7/750/730"
    },
    {
      "id": 8,
      "title": "Современные тренды в уходе за кожей",
      "description": "Семинар о новейших трендах в уходе за кожей и эффективных методах лечения.",
      "date": "15.02.2025",
      "time": "17:00",
      "photo": "https://picsum.photos/id/8/750/730"
    },
    {
      "id": 9,
      "title": "Мастер-класс от Kosmoteros",
      "description": "Практический мастер-класс по использованию инновационных косметических средств.",
      "date": "17.02.2025",
      "time": "18:00",
      "photo": "https://picsum.photos/id/9/750/730"
    },
    {
      "id": 10,
      "title": "Будущее косметологии с Kosmoteros",
      "description": "Обсуждение перспектив развития косметологии и роли инноваций.",
      "date": "19.02.2025",
      "time": "19:00",
      "photo": "https://picsum.photos/id/10/750/730"
    }
  ]
  
  }
  
const readData = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};


const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


app.get('/', (req, res) => {
  const data = readData();
  res.json(data.seminars);
});

app.get('/return', (req, res) => {
    
    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2));
  
    res.json(newData.seminars);
  });

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const seminar = data.seminars.find(s => s.id === parseInt(id));

  if (seminar) {
    res.json(seminar);
  } else {
    res.status(404).send('Seminar not found');
  }
});


app.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updatedSeminar = req.body;
  
  const data = readData();
  let seminar = data.seminars.find(s => s.id === parseInt(id));
  
  if (seminar) {
    seminar = { ...seminar, ...updatedSeminar }; 
    data.seminars = data.seminars.map(s => (s.id === parseInt(id) ? seminar : s)); 
    writeData(data); 
    res.json(seminar);
  } else {
    res.status(404).json({ message: 'Seminar not found' });
  }
});


app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();

  const seminarIndex = data.seminars.findIndex(s => s.id === parseInt(id));

  if (seminarIndex > -1) {
    data.seminars.splice(seminarIndex, 1);
    writeData(data);
    res.status(200).send('Seminar deleted');
  } else {
    res.status(404).send('Seminar not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
