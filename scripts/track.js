
function tracker(){
 const xhr = new XMLHttpRequest();

      // Configure it: GET-request for the URL
      xhr.open('GET', 'https://infinite-sands-52519-06605f47cb30.herokuapp.com/home', true);

      // Set up a callback function to handle the response
      xhr.onload = function () {
        if (xhr.status === 200) {
          // Parse the response and display it
          const response = JSON.parse(xhr.responseText);
          const trackerElement=document.getElementById('tracker');
          if(trackerElement){
          trackerElement.innerHTML = `
            <p>Page Vist: ${response.count}</p>
          `;
          }
        } else {
          // Handle errors
          const trackerElement=document.getElementById('tracker');
          if(trackerElement){}
          trackerElement.textContent = 'Error fetching data.';
        }
      };

      // Handle network errors
      xhr.onerror = function () {
        document.getElementById('tracker').textContent = 'Network error occurred.';
      };

      // Send the request
      xhr.send();
}
