# Simple Gameday Scoreboard

This repository contains code for a public scoreboard and an admin panel. The public scoreboard displays the ranks and scores of participating teams, while the admin panel provides functionalities for adding, updating, and managing team scores.

## Features

- **Public Scoreboard:** Displays the ranks, team names, and scores of participating teams. Updates in real-time based on changes in the admin panel.

- **Admin Panel:** Allows administrators to manage teams' scores. Provides options for adding teams, updating scores, and clearing scores.

## Files and Structure

- `admin.html`: Admin panel interface where administrators can manage team scores.

- `public_scoreboard.html`: Public scoreboard interface that displays the ranks and scores of participating teams.

- `shared.js`: Shared JavaScript file containing common functionality for updating the leaderboard, handling score updates, and more.

- `common.css`: Shared CSS file containing common styles for consistent appearance across both admin and public pages.

## Data Storage

The team data, including team names, scores, and timestamps of updates, is stored in the browser's Local Storage. This allows the data to persist across sessions and enables real-time updates between the admin panel and public scoreboard.

## Setup

1. Clone this repository to your local machine:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```

2. Open the `admin.html` and `public_scoreboard.html` files in your preferred web browser.

3. Use the admin panel to manage teams' scores. The public scoreboard will automatically update to reflect the changes made in the admin panel.

## Usage

1. **Admin Panel:**

   - Use the form to add new teams with their names.
   - Click the "Add Team" button to add a new team to the list.
   - Enter scores in the input fields to update team scores. Press Enter to apply changes.
   - Use the "+10," "+5," and "+3" buttons to quickly increase scores.
   - Click the "Delete Team" button to remove a team from the list.
   - Click the "Clear Scores" button to reset all team scores to 0.

2. **Public Scoreboard:**

   - View the ranks and scores of participating teams.
   - The scoreboard updates in real-time based on changes made in the admin panel.
   - Rows with recently updated scores are highlighted temporarily.

## Customization

- You can customize the CSS styles in the HTML files and the `common.css` file to match your design preferences.
- Modify the `shared.js` file to adjust common functionality according to your requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to fork this repository and adapt the code to your specific use case. If you encounter any issues or have questions, please don't hesitate to reach out.

Happy coding!
