export const getLanguageColor = (language) => {
  const colors = {
    JavaScript: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    React:      'bg-blue-100 text-blue-800 border border-blue-200',
    CSS:        'bg-pink-100 text-pink-800 border border-pink-200',
    HTML:       'bg-orange-100 text-orange-800 border border-orange-200',
    Python:     'bg-green-100 text-green-800 border border-green-200',
    Java:       'bg-red-100 text-red-800 border border-red-200',
    'C++':      'bg-purple-100 text-purple-800 border border-purple-200',
    Ruby:       'bg-rose-100 text-rose-800 border border-rose-200',
    Go:         'bg-teal-100 text-teal-800 border border-teal-200',
    Rust:       'bg-cyan-100 text-cyan-800 border border-cyan-200',
    TypeScript: 'bg-violet-100 text-violet-800 border border-violet-200',
    SQL:        'bg-gray-100 text-gray-800 border border-gray-200',
    Bash:       'bg-amber-100 text-amber-800 border border-amber-200',
    Dockerfile: 'bg-sky-100 text-sky-800 border border-sky-200',
  };
  return colors[language] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

export const LANGUAGES = [
  'All',
  'JavaScript',
  'TypeScript',
  'React',
  'HTML',
  'CSS',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Rust',
  'SQL',
  'Bash',
  'Dockerfile',
];