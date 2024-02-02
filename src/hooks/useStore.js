import Store from '../stores'

export default function useStore (module){
	if(module){
		return Store[module]
	}
	return Store
}