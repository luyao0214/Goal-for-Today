function Entry (text, isGoal) {
  this.text = text;
  this.isGoal = isGoal;
  this.isDone = false;
}

function addLoadEvent(func){
  const oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = () => {
      oldonload();
      func();
    };
  };
};

function turnToId (d) {
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  const idDate = d.getFullYear().toString() + "-" + month.toString() + "-" +  date.toString();
  return idDate;
}

function getNextDId(idDate) {
  let dataDate = idDate.split('-');
  let nextDate = new Date(dataDate[0], dataDate[1] - 1, dataDate[2]);
  nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
  const nextDId = turnToId(nextDate);
  return nextDId;
}

// On startup
function onStartUp(){
  // Create today's day ID
  let d = new Date();
  const idToday = turnToId(d);
  // Display date on DOM card
  const dateBlanks = document.querySelectorAll('h4');
  // On both goal and achievement sides
  for (const blank of dateBlanks) {
    blank.textContent = idToday;
  }
  // Load previous entries
  prepCard(idToday);
};

function prepCard(idDate) {
  // If previous entries exist
  if (localStorage.getItem('daycards')) {
    let dataLS = JSON.parse(localStorage.getItem('daycards'));
    if (dataLS[idDate]) {
      let exEntries = dataLS[idDate];
      for (let i = 0; i < exEntries.length; i++) {
        const liSet = document.createElement('li');
        // Load content
        liSet.textContent = exEntries[i]['text'];
        // Mark state
        if (exEntries[i].isDone) {
          liSet.classList.toggle('crossOut');
        };
        // Prevent default action
        liSet.addEventListener('mousedown',(e) => {
          if (e.detail> 1) {
            e.preventDefault();
          };
        });
        
        // Activate doubleclick listener
        liSet.addEventListener('dblclick',(e) => {
          e.target.classList.toggle('crossOut');
          let newLS = JSON.parse(localStorage.getItem('daycards'));
          newLS[idDate][i].isDone = !newLS[idDate][i].isDone;
          localStorage.setItem('daycards', JSON.stringify(newLS));
        });
        // If it's a goal, display on goal side
        if (exEntries[i].isGoal) {
          document.getElementById('glist').appendChild(liSet);
        } else {
          // If not, display on achievement side
          document.getElementById('alist').appendChild(liSet);
        }
      }
    } else {
      dataLS[idDate] = [];
      localStorage.setItem('daycards', JSON.stringify(dataLS));
    }
  } else {
    let newObj = {};
    newObj[idDate] = [];
    localStorage.setItem('daycards', JSON.stringify(newObj));
  }
  // Flip front to back event listner
  document.getElementById('gFlip').addEventListener('click', (e) => {
    document.getElementById('sec').classList.toggle('flip');
  });
  // Flip back to front event listner
  document.getElementById('aFlip').addEventListener('click', (e) => {
    document.getElementById('sec').classList.toggle('flip');
  });
  // When click previous day button
  
  // When click next day button
  
  // Setup input field
  const gInput = document.getElementById('gnew');
  document.getElementById('gnew').addEventListener('change', (e) => {
    inputHandler(gInput, idDate, true)});
  const aInput = document.getElementById('anew');
  document.getElementById('anew').addEventListener('change', (e) => {
    inputHandler(aInput, idDate, false)});
};
     
    
function inputHandler(input, idDate, isGoal) {
  let dataLS = JSON.parse(localStorage.getItem('daycards'));
  if (!dataLS[idDate]) {
    dataLS[idDate] = [];
  };
  let inputText = input.value;
  let newInput = new Entry (inputText, isGoal);
  dataLS[idDate].push(newInput);
  localStorage.setItem('daycards', JSON.stringify(dataLS));
  const updatedLS = JSON.parse(localStorage.getItem('daycards'));
  const liCurrent = document.createElement('li');
  let entryCurrent = updatedLS[idDate];
  console.log('entryCurrent: ' + entryCurrent);
  let key = entryCurrent.length - 1;
  liCurrent.textContent = entryCurrent[key]['text'];
  console.log('Input value: ' + entryCurrent[key]['text']);
  if (isGoal) {
    document.getElementById('glist').appendChild(liCurrent);
    document.getElementById('gnew').value = '';
  } else {
    document.getElementById('alist').appendChild(liCurrent);
    document.getElementById('anew').value = '';
  }
  liCurrent.addEventListener('mousedown',(e) => {
    if (e.detail> 1) {
      e.preventDefault();
    };
  });
  
  // Activate doubleclick listener
  liCurrent.addEventListener('dblclick',(e) => {
    e.target.classList.toggle('crossOut');
    entryCurrent[key].isDone = !entryCurrent[key].isDone;
    localStorage.setItem('daycards', JSON.stringify(updatedLS));
  });
};
addLoadEvent(onStartUp);
  

// Check if there are any entries for today's card
// If yes, load and display on DOM
// If not, set up the blank card with all listeners

// When user click previous day button

// When user click next day button

// When user enter a goal entry

// When user enter an achievement entry

// When user mark a goal achieved

// When user delete an entry

// When user drag an entry

// When user edit an entry

// When user call the weekly goal 

