import React from 'react'

const Header = (props) => <h1>{props.course}</h1> 

const Total = (props) => <p><strong>total of {props.count} exercises</strong></p>

const Content = ({parts}) => (
    <div>
        {parts.map(part =>
            <p key={part.id}>
                {part.name} {part.exercises}
            </p>)}
    </div>
)

const Course = ({course}) => {
    const exs = course.parts.map(e => e.exercises)
    const sum = exs.reduce((ini, curr) => ini + curr)
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts}/> 
            <Total count={sum} />
        </div>
    )
}

export default Course