import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} content={part} />
    ))}
  </>
);

const Part = ({ content }) => (
  <p>
    {content.name} {content.exercises}
  </p>
);

const Total = ({ course }) => (
  <p style={{ fontWeight: "bold" }}>
    total of {course.reduce((x, part) => x + part.exercises, 0)} exercises
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total course={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
