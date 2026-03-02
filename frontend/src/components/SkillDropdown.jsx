import { useState } from 'react'

function SkillDropdown({
    skillOptions,
    onSkillSelect
}) {
  return (
    <select 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        name="skills" 
        id="skills" 
        onChange={(e) => onSkillSelect(e.target.value)}
    >
        <option value="">Choose a skill...</option>
        {skillOptions.filter(skill => !skillOptions.includes(skill._id)).map((skill) => (
            <option key={skill._id} value={skill._id}>{skill.name}</option>
        ))}
        {!skillOptions.includes('other') && <option value="other">Other</option>}
    </select>
  )
}

export default SkillDropdown