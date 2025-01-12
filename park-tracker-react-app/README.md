Lessons learned in this project

.filter() to filter an array of objects for a certain value, creates a new array of objects

a function within a button i.e. in parklist, with the park object being used and passed as the parameter:
onClick={() => handleChange(park)}

and the associated function 
const handleChange = (park) => {
    setChosenPark(park)
}
