// @ts-ignore
import StringMask from 'string-mask'
import t from 'typy'

export const applyPhoneMask = (value: string) => {
	const mask = new StringMask('(##) #####-####')

	if (value) {
		return mask.apply(value.replace(/\D/g, ''))
	}
	return value
}

export const normalizeInput = (value: string) => {
	return t(value)
		.safeString.toUpperCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
}

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i += 1) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}
