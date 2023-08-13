const gameboards = document.querySelectorAll('.gameboard');

gameboards.forEach((gameboard) => {
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      const data = {
        col,
        row,
      };
      const square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('data-cord', JSON.stringify(data));
      gameboard.appendChild(square);
    }
  }
});

// Highlight coordinates when hovering enemy board
const enemySquares = document.querySelectorAll('#gameboard-2 .square');
const columnLegendContainerEnemy = document.querySelector('#gameboard-2 .col-legend-container');
const rowLegendContainerEnemy = document.querySelector('#gameboard-2 .row-legend-container');

enemySquares.forEach((enemySquare) => {
  const coordinates = JSON.parse(enemySquare.getAttribute('data-cord'));

  enemySquare.addEventListener('mouseover', () => {
    const colLegend = columnLegendContainerEnemy.querySelector(`[data-col="${coordinates.col}"]`);
    const rowLegend = rowLegendContainerEnemy.querySelector(`[data-row="${coordinates.row}"]`);

    colLegend.classList.add('legend-hover');
    rowLegend.classList.add('legend-hover');
  });

  enemySquare.addEventListener('mouseout', () => {
    columnLegendContainerEnemy
      .querySelectorAll('.col-legend')
      .forEach((legendCell) => legendCell.classList.remove('legend-hover'));

    rowLegendContainerEnemy
      .querySelectorAll('.row-legend')
      .forEach((legendCell) => legendCell.classList.remove('legend-hover'));
  });
});

// Highlight coordinates when hovering place ship board
const placeShipSquares = document.querySelectorAll('#gameboard-place-ships .square');
const columnLegendContainerPlace = document.querySelector('#gameboard-place-ships .col-legend-container');
const rowLegendContainerPlace = document.querySelector('#gameboard-place-ships .row-legend-container');

placeShipSquares.forEach((placeShipSquare) => {
  const coordinates = JSON.parse(placeShipSquare.getAttribute('data-cord'));

  placeShipSquare.addEventListener('mouseover', () => {
    const colLegend = columnLegendContainerPlace.querySelector(`[data-col="${coordinates.col}"]`);
    const rowLegend = rowLegendContainerPlace.querySelector(`[data-row="${coordinates.row}"]`);

    colLegend.classList.add('legend-hover');
    rowLegend.classList.add('legend-hover');
  });

  placeShipSquare.addEventListener('mouseout', () => {
    columnLegendContainerPlace
      .querySelectorAll('.col-legend')
      .forEach((legendCell) => legendCell.classList.remove('legend-hover'));

    rowLegendContainerPlace
      .querySelectorAll('.row-legend')
      .forEach((legendCell) => legendCell.classList.remove('legend-hover'));
  });
});
