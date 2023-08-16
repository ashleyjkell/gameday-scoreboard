// Define function to load teams data from Local Storage
function loadTeamsData() {
    // Retrieve team data from Local Storage
    const teamData = localStorage.getItem('teams');
    const teams = teamData ? JSON.parse(teamData) : [];
  
    // Sort teams based on scores
    teams.sort((a, b) => b.score - a.score);
  
    // Clear existing rows
    const leaderboard = document.getElementById('leaderboard');
    while (leaderboard.rows.length > 1) {
      leaderboard.deleteRow(1);
    }
  
    // Add rows to the leaderboard
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const row = leaderboard.insertRow();
      const rankCell = row.insertCell();
      const nameCell = row.insertCell();
      const scoreCell = row.insertCell();
  
      rankCell.className = 'rank';
      nameCell.className = 'team-name';
      scoreCell.className = 'score';
      rankCell.textContent = i + 1;
  
      // Limit the team name to 30 characters
      const teamName = team.name.length > 30 ? team.name.slice(0, 27) + '...' : team.name;
      nameCell.textContent = teamName;
      scoreCell.textContent = team.score;
    }
  }
  
  // Listen for changes to Local Storage
  window.addEventListener('storage', loadTeamsData);
  
  // Load initial teams data
  loadTeamsData();
  
  // Define function to update the leaderboard highlighting
  function updateLeaderboardHighlighting() {
    const leaderboard = document.getElementById('leaderboard');
    const rows = leaderboard.getElementsByTagName('tr');
  
    // Remove the highlight class from all rows
    for (let i = 1; i < rows.length; i++) {
      rows[i].classList.remove('highlight');
    }
  
    // Find the most recently updated row
    let latestUpdatedRow = null;
    const teamData = localStorage.getItem('teams');
    const teams = teamData ? JSON.parse(teamData) : [];
    let latestUpdatedTimestamp = 0;
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const row = rows[i + 1];
      if (row && team.lastUpdated > latestUpdatedTimestamp) {
        latestUpdatedRow = row;
        latestUpdatedTimestamp = team.lastUpdated;
      }
    }
  
    // Add the highlight class to the most recently updated row
    if (latestUpdatedRow) {
      latestUpdatedRow.classList.add('highlight');
    }
  }
  
  // Call the updateLeaderboardHighlighting function on page load and every 2 seconds
  setInterval(updateLeaderboardHighlighting, 1000);
  