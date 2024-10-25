const Course = (props) => {
  
    return(
      <div>
        {props.courses.map(course => {
          return(
            <div key={course.id}>
              <h2>{course.name}</h2>
              {course.parts.map(part => {
                return(
                  <p key={part.id}>{part.name} {part.exercises}</p>
                )
              })}
              <p><b>total of {course.parts.reduce((accumulator, currentValue) =>
              accumulator + currentValue.exercises,
              0,
              )} exercises</b></p>
            </div>
          )
        })}
      </div>
    )
  }

export default Course