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
