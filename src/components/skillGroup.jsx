"use client";

const SkillGroup = ({ group, items }) => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base text-gray-800">{group}</h3>
            <div className="flex gap-2 flex-wrap">
                {items.map((skill) => (
                    <a
                        key={skill.label}
                        href={skill.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black border border-black transition-colors"
                    >
                        {skill.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SkillGroup;
