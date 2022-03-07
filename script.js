const grid = document.querySelector('.grid')
let gridWidth = 8;
let gridTotalPixels = 320

let colorful = false

const eraser = document.querySelector('.eraserDiv')
eraser.addEventListener('click', function(e) {
  erase()
})

const colorBtn = document.querySelector('.color')
colorBtn.addEventListener('click', function(e) {
  colorful = !colorful
  if (colorful) {
    const colorText = document.createElement('p')
    colorText.textContent = "Color is on"
    colorBtn.appendChild(colorText)
  } else {
    const lastChild = colorBtn.lastChild
    colorBtn.removeChild(lastChild)
  }
})

createGrid()

function createGrid() {
  if (gridWidth > 100) {
    gridWidth = 100
  }
  for (let i = 0; i < gridWidth; i++) {
    const row = document.createElement('div');
    row.classList.add('row')
    for (let j = 0; j < gridWidth; j++) {
        const gridSquare = document.createElement('div')
        gridSquare.classList.add('gridSquare')
        gridSquare.style.width = `${gridTotalPixels / gridWidth}px`;
        gridSquare.style.height = `${gridTotalPixels / gridWidth}px`;
        gridSquare.addEventListener('mouseover', function(e) {

            if (colorful) {
              //random colors
              let r = Math.floor(Math.random() * 255)
              let g = Math.floor(Math.random() * 255)
              let b = Math.floor(Math.random() * 255)
              e.target.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')'
            } else {
                //darkens existing color
                let color = window.getComputedStyle(e.target)
                color = color.backgroundColor
                color = convertColor(color)
                e.target.style.backgroundColor = 'rgb(' + (color[0] - 50) + ',' + (color[1] - 50) + ',' + (color[2] - 50) + ')'
            }
            
            

        })
        row.appendChild(gridSquare)
    }
    grid.appendChild(row)
  }
}


function erase() {
  removeGrid()
  console.log('inside erase')
  const gridSquares = document.querySelectorAll('.gridSquare')
  for (let i = 0; i < gridSquares.length; i++) {
    gridSquares[i].style.backgroundColor = 'rgb(255,255,255)'
  }

  gridWidth = prompt("How many squares would you live your new canvas to have? (1-100)")

  createGrid()
}

function removeGrid() {
  while (grid.firstChild) {
    const child = grid.firstChild
    grid.removeChild(child)
  }
}



function convertColor(color)
{  
  var rgbColors=new Object();

  ///////////////////////////////////
  // Handle rgb(redValue, greenValue, blueValue) format
  //////////////////////////////////
  if (color[0]=='r')
  {
    // Find the index of the redValue.  Using subscring function to 
    // get rid off "rgb(" and ")" part.  
    // The indexOf function returns the index of the "(" and ")" which we 
    // then use to get inner content.  
    color=color.substring(color.indexOf('(')+1, color.indexOf(')'));
  
    // Notice here that we don't know how many digits are in each value,
    // but we know that every value is separated by a comma.
    // So split the three values using comma as the separator.
    // The split function returns an object.
    rgbColors=color.split(',', 3);

    // Convert redValue to integer
    rgbColors[0]=parseInt(rgbColors[0]);
    // Convert greenValue to integer
    rgbColors[1]=parseInt(rgbColors[1]);
    // Convert blueValue to integer
    rgbColors[2]=parseInt(rgbColors[2]);		
  }

  ////////////////////////////////
  // Handle the #RRGGBB' format
  ////////////////////////////////
  else if (color.substring(0,1)=="#")
  {
    // This is simples because we know that every values is two 
    // hexadecimal digits.
    rgbColors[0]=color.substring(1, 3);  // redValue
    rgbColors[1]=color.substring(3, 5);  // greenValue
    rgbColors[2]=color.substring(5, 7);  // blueValue

    // We need to convert the value into integers, 
    //   but the value is in hex (base 16)!
	// Fortunately, the parseInt function takes a second parameter 
    // signifying the base we're converting from.  
    rgbColors[0]=parseInt(rgbColors[0], 16);
    rgbColors[1]=parseInt(rgbColors[1], 16);
    rgbColors[2]=parseInt(rgbColors[2], 16);
	}
  return rgbColors;
}