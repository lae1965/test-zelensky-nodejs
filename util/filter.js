export const filter = (data, airport, airline) => {
  const startDate = Date.now();
  let filterData;
  const isAirport = !!airport && airport !== '0';
  const isAirline = !!airline && airline !== '0';
  if (!isAirport && !isAirline) filterData = data;
  filterData = data.filter(offer => {
    let find = false;
    for(const flight of offer.Flights.Item) {
      let findAirport = false, findAirline = false;
      if (!isAirport || flight.Origin === airport || flight.Destination === airport) findAirport = true;
      if (!isAirline || flight.Code === airline) findAirline = true;
      if (findAirport && findAirline) {
        find = true;
        break;
      }
    }
    return find;
  });

  return {
    offersData: filterData,
    filterTime: Date.now() - startDate,
  }
}