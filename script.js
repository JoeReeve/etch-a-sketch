const grid = document.querySelector('.grid')

for (let i = 0; i < 8; i++) {
    const row = document.createElement('div');
    row.classList.add('row')
    for (let j = 0; j < 8; j++) {
        const gridSquare = document.createElement('div')
        gridSquare.classList.add('gridSquare')
        gridSquare.addEventListener('mouseover', function(e) {
            e.target.style.backgroundColor = 'rgb(100, 100, 100)'
        })
        row.appendChild(gridSquare)
    }
    grid.appendChild(row)
}