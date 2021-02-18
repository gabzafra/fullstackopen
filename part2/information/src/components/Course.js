import React from "react";

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

export default Course;
