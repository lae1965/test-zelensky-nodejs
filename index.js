'use strict';
import express from 'express';
import { engine } from 'express-handlebars';
import { filter } from './util/filter.js';

import { xml2Object } from './util/xml2Object.js';

const PORT = process.env.PORT | 3333;

const renderData = xml2Object();

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.use(express.static('public'));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  const { airports, airlines } = req.query;
  const afterFilter = filter(renderData.offersData, airports, airlines);
  res.render('main', {
    layout: false,
    offersData: afterFilter.offersData,
    airports: renderData.airports,
    airlines: renderData.airlines,
    parseTime: renderData.parseTime,
    filterTime: afterFilter.filterTime,
  });
});

app.listen(PORT, () => { 
  console.log(`Server has been started on ${PORT} PORT`);
});