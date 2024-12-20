
function showStatistics(data) {
  const mean = jStat.mean(data);
  const median = jStat.median(data);
  const stdDev = jStat.stdev(data, true); 
  const statisticsDiv = document.getElementById('statistics');
    statisticsDiv.innerHTML = `
        <h3>Summary Statistics</h3>
        <p>Mean: ${mean}</p>
        <p>Median: ${median}</p>
        <p>Standard Deviation: ${stdDev}</p>
    `;
}


/**
 * The plotHistogram function creates a histogram trace using Plotly and displays it in the plot div.
 * 
 * @param {Array} data 
 */

function plotHistogram(data) {
  const trace = {
      x: data,
      type: 'histogram',
      marker: { color: 'blue' }
  };

  const layout = {
      title: 'Histogram',
      xaxis: { title: 'Values' },
      yaxis: { title: 'Frequency' }
  };

  Plotly.newPlot('plot', [trace], layout);
}

/**
 * The plotData function creates a scatter plot trace using Plotly and displays it in the plot div.
 * 
 * @param {Array} x 
 * @param {Array} y 
 */
function plotData(x, y) {
  const trace = {
      x: x,
      y: y,
      type: 'line',
      mode: 'lines+markers',
      marker: { color: 'red' }
  };

  const layout = {
      title: 'CSV Data Plot',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' }
  };

  Plotly.newPlot('plot', [trace], layout);
}
