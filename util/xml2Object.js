import * as fs from 'fs';
import  xmlParser from 'xml2json';

import { microseconds2HoursMinutes, parseDate } from './parseDate.js';

export const xml2Object = () => {
  const startDate = Date.now();
  const xmlData = fs.readFileSync('backend_xml_responce.xml', 'utf8');

  const jsData = xmlParser.toJson(xmlData, { object: true }).SearchResult;
  return {
    airports: jsData.References.Airports.Item.map(airport =>({
      Name: airport.Name,
      Code: airport.Code,
    })),
    airlines: jsData.References.Airlines.Item.map(airline => ({
      Name: airline.Name,
      Code: airline.Code,
    })),
    offersData: jsData.Offers.Item.map(offer => ({
      Price: offer.Price,
      IsCombined: offer.IsCombined.toLowerCase() === 'true' ? 'Да' : 'Нет',
      charter: offer.charter.toLowerCase() === 'true' ? 'Да' : 'Нет',
      Flights: {
        Item: offer.Flights.Item.map(flight => ({
          Code: flight.Code,
          Num: flight.Num,
          Origin: flight.Origin,
          Destination: flight.Destination,
          Depart: parseDate(flight.Depart),
          Arrive: parseDate(flight.Arrive),
          Duration: microseconds2HoursMinutes(+flight.DurationMS),
          SegmentId: flight.SegmentId === '0' ? 'Туда' : 'Обратно',
        })),
      },
    })),
    parseTime: Date.now() - startDate,
  } 
}