function updateLeaderboard(teams) {
    const leaderboard = document.getElementById('leaderboard');
  
    // Clear existing rows
    while (leaderboard.rows.length > 1) {
      leaderboard.deleteRow(1);
    }
  
    // Sort teams based on scores
    teams.sort((a, b) => b.score - a.score);
  
    // Add rows to the leaderboard
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const row = leaderboard.insertRow();
      const rankCell = row.insertCell();
      const nameCell = row.insertCell();
      const scoreCell = row.insertCell();
      const inputCell = row.insertCell();
      const deleteCell = row.insertCell();
  
      rankCell.className = 'rank';
      nameCell.textContent = team.name;
      scoreCell.className = 'score';
      rankCell.textContent = i + 1;
  
      // Highlight the row if the score was recently updated
      if (team.updated) {
        row.classList.add('highlight');
        team.updated = false;
      }
  
      const scoreInput = document.createElement('input');
      scoreInput.type = 'number';
      scoreInput.className = 'score-input';
      scoreInput.value = team.score;
      scoreInput.min = 0;
      scoreInput.max = 9999;
      scoreInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default form submission behavior
          updateScore(i, scoreInput);
          scoreInput.blur(); // Remove focus from the input box
        }
      });
    
      const add10Button = document.createElement('button');
      add10Button.textContent = '+10';
      add10Button.addEventListener('click', () => addToScore(i, 10, scoreInput));
  
      const add5Button = document.createElement('button');
      add5Button.textContent = '+5';
      add5Button.addEventListener('click', () => addToScore(i, 5, scoreInput));
  
      const add3Button = document.createElement('button');
      add3Button.textContent = '+3';
      add3Button.addEventListener('click', () => addToScore(i, 3, scoreInput));
  
      inputCell.appendChild(scoreInput);
      inputCell.appendChild(add10Button);
      inputCell.appendChild(add5Button);
      inputCell.appendChild(add3Button);
  
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'Delete Team';
      deleteButton.addEventListener('click', () => deleteTeam(i));
  
      deleteCell.appendChild(deleteButton);
    }
  
    // Store the updated team data in Local Storage
    localStorage.setItem('teams', JSON.stringify(teams));
  }
  
  function addNewTeam() {
    const newTeamName = document.getElementById('newTeamName').value.trim();
  
    if (!newTeamName) {
      alert('Please enter a valid team name.');
      return;
    }
  
    // Retrieve existing team data from Local Storage
    const teamData = localStorage.getItem('teams');
    const teams = teamData ? JSON.parse(teamData) : [];
  
    // Check for duplicate team names
    const duplicateTeam = teams.find(
      team => team.name.toLowerCase() === newTeamName.toLowerCase()
    );
    if (duplicateTeam) {
      alert('A team with the same name already exists.');
      return;
    }
  
    // Add the new team with 0 points and updated flag set to false to the array
    teams.push({ name: newTeamName, score: 0, updated: false });
  
    // Store the updated team data in Local Storage
    localStorage.setItem('teams', JSON.stringify(teams));
  
    // Update the leaderboard with the updated team data
    updateLeaderboard(teams);
  
    // Reset the form input
    document.getElementById('newTeamName').value = '';
    document.getElementById('newTeamName').focus();
  }
  
  function updateScore(index, inputElement) {
    const newScore = parseInt(inputElement.value);
  
    // Retrieve existing team data from Local Storage
    const teamData = localStorage.getItem('teams');
    const teams = teamData ? JSON.parse(teamData) : [];
  
    // Update the score and set lastUpdated for the specified team
    teams[index].score = newScore;
    teams[index].lastUpdated = Date.now();
  
    // Store the updated team data in Local Storage
    localStorage.setItem('teams', JSON.stringify(teams));
  
    // Update the leaderboard with the updated team data
    updateLeaderboard(teams);
  }
  
  function addToScore(index, value, inputElement) {
    const currentScore = parseInt(inputElement.value);
    const newScore = currentScore + value;
  
    // Retrieve existing team data from Local Storage
    const teamData = localStorage.getItem('teams');
    const teams = teamData ? JSON.parse(teamData) : [];
  
    // Update the score and set lastUpdated for the specified team
    teams[index].score = newScore;
    teams[index].lastUpdated = Date.now();
  
    // Store the updated team data in Local Storage
    localStorage.setItem('teams', JSON.stringify(teams));
  
    // Update the leaderboard with the updated team data
    updateLeaderboard(teams);
  }
  
  function deleteTeam(index) {
    const confirmation = confirm('Are you sure you want to delete this team?');
    if (confirmation) {
      // Retrieve existing team data from Local Storage
      const teamData = localStorage.getItem('teams');
      const teams = teamData ? JSON.parse(teamData) : [];
  
      // Delete the team from the array
      teams.splice(index, 1);
  
      // Store the updated team data in Local Storage
      localStorage.setItem('teams', JSON.stringify(teams));
  
      // Update the leaderboard with the updated team data
      updateLeaderboard(teams);
    }
  }
  
  function clearScores() {
    const confirmation = confirm('Are you sure you want to clear all scores?');
    if (confirmation) {
      // Retrieve existing team data from Local Storage
      const teamData = localStorage.getItem('teams');
      const teams = teamData ? JSON.parse(teamData) : [];
  
      // Reset the score and updated flag for all teams
      teams.forEach(team => {
        team.score = 0;
        team.updated = false;
      });
  
      // Store the updated team data in Local Storage
      localStorage.setItem('teams', JSON.stringify(teams));
  
      // Update the leaderboard with the updated team data
      updateLeaderboard(teams);
    }
  }
  
  function clearStorage() {
    const confirmation = confirm('Are you sure you want to clear all data? This action cannot be undone.');
    if (confirmation) {
      // Clear the team data from Local Storage
      localStorage.removeItem('teams');
  
      // Clear the leaderboard
      const leaderboard = document.getElementById('leaderboard');
      while (leaderboard.rows.length > 1) {
        leaderboard.deleteRow(1);
      }
    }
  }
  