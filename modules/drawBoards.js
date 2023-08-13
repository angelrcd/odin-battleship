const gameboards = document.querySelectorAll('.gameboards-container .gameboard');

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

// Highlight coordinates when hovering
const enemySquares = document.querySelectorAll('#gameboard-2 .square');
const columnLegendContainer = document.querySelector('#gameboard-2 .col-legend-container');
const rowLegendContainer = document.querySelector('#gameboard-2 .row-legend-container');

enemySquares.forEach((enemySquare) => {
  const coordinates = JSON.parse(enemySquare.getAttribute('data-cord'));

  enemySquare.addEventListener('mouseover', () => {
    const colLegend = columnLegendContainer.querySelector(`[data-col="${coordinates.col}"]`);
    const rowLegend = rowLegendContainer.querySelector(`[data-row="${coordinates.row}"]`);

    colLegend.classList.add('legend-hover');
    rowLegend.classList.add('legend-hover');
  });

  enemySquare.addEventListener('mouseout', () => {
    columnLegendContainer
      .querySelectorAll('.col-legend')
      .forEach((legendCell) => legendCell.classList.remove('legend-hover'));

    rowLegendContainer
      .querySelectorAll('.row-legend')
      .forEach((legendCell) => legendCell.classList.remove('legend-hover'));
  });
});
