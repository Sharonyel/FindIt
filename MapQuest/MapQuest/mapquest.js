L.mapquest.key = '6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl';

// 'map' refers to a <div> element with the ID map
L.mapquest.map('map', {
  center: [37.7749, -122.4194],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});

placeSearch({
    key: '6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl',
    container: document.querySelector('#place-search-input')
  });