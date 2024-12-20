document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const rows = content.split('\n').map(row => row.split(','));
        if (rows.length > 0) {
            const headers = rows[0];
            displayColumnSelection(headers);
            document.getElementById('plotButton').disabled = false;
            document.getElementById('statsButton').disabled = false;
            document.getElementById('histogramButton').disabled = false;
        }
    };

    reader.onerror = function() {
        console.error("Could not read the file");
    };

    reader.readAsText(file);
});

function displayColumnSelection(headers) {
    const columnSelectionDiv = document.getElementById('columnSelection');
    columnSelectionDiv.innerHTML = ''; // Clear previous content

    headers.forEach((header, index) => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = index;
        checkbox.checked = index < 2; // Pre-select the first two columns
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(header));
        columnSelectionDiv.appendChild(label);
        columnSelectionDiv.appendChild(document.createElement('br'));
    });
}

document.getElementById('plotButton').addEventListener('click', plotAction);
document.getElementById('statsButton').addEventListener('click', statsAction);
document.getElementById('histogramButton').addEventListener('click', histogramAction);


function statsAction() {
    const selectedIndices = getSelectedIndices();
    if (selectedIndices.length < 1) {
        alert("Please select at least one column for statistics.");
        return;
    }
  
    const file = document.getElementById('fileInput').files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
        const content = e.target.result;
        const rows = content.split('\n').map(row => row.split(','));
        const data = [];
  
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length === rows[0].length) {
                data.push(parseFloat(row[selectedIndices[0]]));
            }
        }
  
        showStatistics(data);
    };
  
    reader.readAsText(file);
  }

  
/**
 * The plotAction function reads the selected columns from the uploaded CSV file and plots a scatter plot of the data.
 * 
 * @returns  
 */
function plotAction() {
    const selectedIndices = getSelectedIndices();
    if (selectedIndices.length < 2) {
        alert("Please select at least two columns to plot.");
        return;
    }
  
    const file = document.getElementById('fileInput').files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
        const content = e.target.result;
        const rows = content.split('\n').map(row => row.split(','));
        const x = [];
        const y = [];
  
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length === rows[0].length) {
                x.push(row[selectedIndices[0]]);
                y.push(parseFloat(row[selectedIndices[1]]));
            }
        }
  
        plotData(x, y);
    };
  
    reader.readAsText(file);
  }
  
  
  /*
  * The histogramAction function reads the selected columns from the uploaded CSV file and plots a histogram of the data.
  * The plotHistogram function creates a histogram trace using Plotly and displays it in the plot div.
  * The plotData function creates a scatter plot trace using Plot
  */
  
   function histogramAction() {
    const selectedIndices = getSelectedIndices();
    if (selectedIndices.length < 1) {
        alert("Please select at least one column to plot a histogram.");
        return;
    }
  
    const file = document.getElementById('fileInput').files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
        const content = e.target.result;
        const rows = content.split('\n').map(row => row.split(','));
        const data = [];
  
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length === rows[0].length) {
                data.push(parseFloat(row[selectedIndices[0]]));
            }
        }
  
        plotHistogram(data);
    };
  
    reader.readAsText(file);
  }
function getSelectedIndices() {
    const checkboxes = document.querySelectorAll('#columnSelection input[type="checkbox"]');
    const selectedIndices = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedIndices.push(parseInt(checkbox.value));
        }
    });

    return selectedIndices;
}


