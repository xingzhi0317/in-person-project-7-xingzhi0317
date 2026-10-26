import { useState, useEffect } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSkills([
  {
    "id": 1,
    "name": "I know how to cook traditional dishes",
    "category": "Cooking",
    "level": 92
  },
  {
    "id": 2,
    "name": "I am good at playing basketball",
    "category": "Sports",
    "level": 95
  },
  {
    "id": 3,
    "name": "I can earn money through various means",
    "category": "Life",
    "level": 88
  },
  {
    "id": 4,
    "name": "I can play the guitar",
    "category": "Music",
    "level": 85
  },
  {
    "id": 5,
    "name": "I am good at coding",
    "category": "Programming",
    "level": 80
  }
]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <section id="skills" className="skills">
        <div className="container">
          <h2>Skills</h2>
          <p>Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Skills & Interests</h2>
        <div className="skills-grid">
          {skills.map(skill => (
            <div key={skill.id} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="skill-category">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
