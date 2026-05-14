import skills from '../constants/skills'

function SkillPicker({ selectedSkills, onChange }) {

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

  return (
    <div className='skill-picker'>
      {skills.map(skill => (
        <button key={skill} type='button' onClick={() => toggleSkill(skill)} className={selectedSkills.includes(skill) ? 'skill-button selected' : 'skill-button'}>
          {skill}
        </button>
      ))}
    </div>
  )
}

export default SkillPicker
