Hello dear web portal dev prospect!

This repository is a playground for your submission.
Before getting started, please make sure to create a new branch (named like your GitHub username) on which you commit and push your code regularly.
See the task below.

If you encounter a problem or have questions about the task, feel free to email me under <dbutemann@vero.de>.

Good luck and have fun ☘️

# Task

Develop a web page that connects to a remote API, downloads a dataset, displays a table with the downloaded dataset, and provides some basic search and filter functions.

In particular, the web page should:

- Request the resources located at `https://api.baubuddy.de/dev/index.php/v1/tasks/select` from PHP
- Display the downloaded resources in a table showing `task`, `title`, `description` and `colorCode`
  - Create a view component which is colored like the `colorCode`
- Create a search which allows searching for any of the data in the table
- Create a button that opens a modal. In this modal there should be another button to select any image from the file system. When you have selected the image, it will be displayed in the modal
- Implement auto-refresh functionality which requests the resources from above every 60 minutes and updates the table with the new data
