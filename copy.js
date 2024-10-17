const fs = require('fs-extra');
fs.copy('views', 'dist/views')
	.then(() => console.log('success Views!'))
	.catch(err => console.error(err))

fs.copy('public', 'dist/public')
	.then(() => console.log('success Public!'))
	.catch(err => console.error(err))

	fs.copy('vercel.json', 'dist/vercel.json')
	.then(() => console.log('success vercel.json!'))
	.catch(err => console.error(err))