
# CFG Simplification


### Summary

This project contais the implementation of a validator for each step during a Context Free Grammar simplification, process used in the first stage of Greibach and Chomsky normalization of cfg's.

---
## Technologies

JavaScript (ES6)
Node.js

---

## Functionalities

The project was divided in 3 major responsibilities:

- *Extractors*: To get non-terminal and terminal symbols, as well the reachable symbols
- *Displayers*: Get the object of a grammar and display it as the normal form used in the discipline books
- *Validator*: Check the three steps of the simplification:
	
	1. Null - Productions: iterate over the grammar and checking for the epsilon symbol in one of them
	2. Variable replace: iterate over the productions and see if there is a production of just one variable
	3. Unused Symbols: See if the productions just contains reachable symbols.

To test this locally with a node environment configured, run: 

```
git clone https://github.com/murilo-l1/cfg-simplification-validator.git

npm install 

npm start

```
