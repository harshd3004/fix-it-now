import React from 'react'

function SkillsList({
    skills,
    onRemoveSkill
}) {
  return (
    <>
        {skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
                {skills.map(skill => {
                    return (
                        <div key={skill._id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                            {skill.name}
                            {onRemoveSkill && (
                                    <button
                                        type="button"
                                        onClick={() => onRemoveSkill(skill._id)}
                                        className="font-bold hover:text-blue-900"
                                    >
                                        ✕
                                    </button>
                                )
                            }
                        </div>
                    );
                })}
            </div>
        )}
    </>
  )
}

export default SkillsList