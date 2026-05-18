import skills from '../constants/skills'


//1.Page loads → buttons render from skills
//2.User clicks a button
//3.toggleSkill(skill) runs
//4.Skill is added or removed
//5.onChange() updates parent state
//6.selectedSkills updates
//7.Component re-renders
//8.Button style updates automatically

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
        // Each button gets a 'selected' class if its skill is in selectedSkills if not it gets the default 'skill-button' class.
        <button key={skill} type='button' onClick={() => toggleSkill(skill)} className={selectedSkills.includes(skill) ? 'skill-button selected' : 'skill-button'}>
          {skill}
        </button>
      ))}
    </div>
  )
}

export default SkillPicker
