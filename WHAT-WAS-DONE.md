# What was done

## Back-end
* Endpoint for retrieving SQL-query history was added to rawSqlRouter.
* Updated codebase to support async-await syntax in router.
* query_history table added to sqlite database.
* Improved rawSqlRouter get handler to save the query to query_history table

## Front-end
* General code structure re-factoring was done in order to have module-based codebase.
* Kill-by-weapon graph was added (bar chart used)
* Live-Movement graph was added to show user positions by frames (existing Heatmap chart was used).
* Query History functionality was added. While clicking on "H" inside sql query input, the table with last 10 queries is shown via Table within modal. Each row in a table will override current query input & run the query.
* Website became more mobile-friendly. Sidebar is going to the bottom on small screens.