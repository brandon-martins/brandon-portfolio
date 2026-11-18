import type { SkillGroup } from './types';

// Grouped skills. Each is matched by name against project `tech` lists to show "N projects" evidence.
export const skillGroups: SkillGroup[] = [
	{
		title: 'Frontend',
		skills: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
	},
	{ title: 'Backend', skills: ['Node.js', 'Express', 'Java', 'PHP', 'C#'] },
	{ title: 'Data', skills: ['MongoDB', 'MySQL'] },
	{ title: 'Cloud & tooling', skills: ['AWS', 'Git & GitHub'] },
];
