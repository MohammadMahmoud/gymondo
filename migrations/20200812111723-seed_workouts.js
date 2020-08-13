const moment = require('moment');
const faker = require('faker');
const { v4 } = require('uuid');

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const createRecords = () => {
  const records = [];
  const info = [
    {
      name: 'Get in Shape',
      category: 'c1',
      description: '30 min Get in Shape workout',
      image:
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/551eac486b5ba477c6a7e38c72f0c1f4/e1738/webapp-titleimage-2x.jpg',
    },
    {
      name: 'Yoga basics',
      category: 'c2',
      description: '30 min Yoga basics workout',
      image:
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/76e6e0c325f6f5107cb45503070dab58/e1738/webapp-titleimage-2x.jpg',
    },
    {
      name: 'Burn',
      category: 'c3',
      description: '30 min Burn workout',
      image:
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/3fd79d670a617ac202c10317d9805476/c09fc/webapp-titleimage-2x.jpg',
    },
    {
      name: 'Total Body Shape',
      category: 'c4',
      description: '30 min Total Body Shape workout',
      image:
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/e3634b53399d9618c829fc04efe33d06/e1738/webapp-titleimage-2x.jpg',
    },
    {
      name: 'Bootcamp',
      category: 'c5',
      description: '30 min Bootcamp workout',
      image:
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/a572a94909a9e3c1f634724a2ed2fe78/e1738/webapp-titleimage-2x.jpg',
    },
    {
      name: 'Cardio',
      category: 'c6',
      description: '30 min Cardio workout',
      image:
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/e5f6475286828d3a798d72daf24595bf/711f3/webapp-titleimage-2x.jpg',
    },
    {
      name: 'Barre',
      category: 'c7',
      description: '30 min Barre workout',
      image:
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/bb6ec64ff7cb2e85375303a9222afcf4/711f3/webapp-titleimage-2x.jpg',
    },
  ];

  for (let i = 1; i <= 1000; i++) {
    let record = new Object();
    let randomIndex = randomNumber(info.length);
    record.name = info[randomIndex].name;
    record.category = info[randomIndex].category;
    record.description = info[randomIndex].description;
    record.image = info[randomIndex].image;
    record.startDate = faker.date.between(
      moment().format(),
      moment().add(12, 'months')
    );
    record._id = v4();

    records.push(record);
  }

  return records;
};

createRecords();

module.exports = {
  async up(db, client) {
    await db.collection('workouts').insertMany(createRecords());
  },

  async down(db, client) {
    await db.collection('workouts').deleteMany([]);
  },
};
