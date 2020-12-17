import {ADD_SAMPLE} from '../mapping'

export function addSample(sample: string) {
	return {
		type: ADD_SAMPLE,
		sample
	}
}
