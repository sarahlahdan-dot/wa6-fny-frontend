import skillsByCategory from '../constants/skills'
import { useState } from 'react'

//1.Page loads → buttons render from skills
//2.User clicks a button
//3.toggleSkill(skill) runs
//4.Skill is added or removed
//5.onChange() updates parent state
//6.selectedSkills updates
//7.Component re-renders
//8.Button style updates automatically

function SkillPicker({ selectedSkills, onChange }) {
  const [openCategory, setOpenCategory] = useState('null')

    function toggleSkill(skill) {
        if (selectedSkills.includes(skill)) {
            onChange(selectedSkills.filter((s) => {
                return s !== skill
            }))
        }
        else {
        onChange([...selectedSkills, skill])
        }
    }

    function toggleCategory(category) {
      setOpenCategory(openCategory === category ? 'null' : category)
    }

  return (
    <div className='skill-picker'>
      {Object.entries(skillsByCategory).map(([category, skills]) => (
        <div key={category} className='skill-category'>

          {/* category header — click to expand/collapse */}
          <button
            type='button'
            className='category-header'
            onClick={() => toggleCategory(category)}
          >
            <span>{category}</span>
            {/* show how many skills selected in this category */}
            {skills.filter(s => selectedSkills.includes(s)).length > 0 && (
              <span className='category-count'>
                {skills.filter(s => selectedSkills.includes(s)).length} selected
              </span>
            )}
            <span className='category-arrow'>
              {openCategory === category ? '▲' : '▼'}
            </span>
          </button>

          {/* skills — only show if category is open */}
          {openCategory === category && (
            <div className='skill-panel'>
              {skills.map(skill => (
                <button
                  key={skill}
                  type='button'
                  onClick={() => toggleSkill(skill)}
                  className={selectedSkills.includes(skill) ? 'skill-button selected' : 'skill-button'}
                >
                  {skill}
                </button>
              ))}
            </div>
          )}

        </div>
      ))}
    </div>
  )
}

export default SkillPicker
