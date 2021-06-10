import Vue from 'vue';

function broadcast(componentName: string, eventName: string, params: any) { // tslint:disable-line:no-any
	// @ts-ignore
	(this as Vue).$children.forEach(child => {
		const name = child.$options.name;

		if (name === componentName) {
			// @ts-ignore
			child.$emit.apply(child, [eventName].concat(params)); // eslint-disable-line
		} else {
			// @ts-ignore
			broadcast.apply(child, [componentName, eventName].concat([params])); // eslint-disable-line
		}
	});
}

export default Vue.extend({
	methods: {
		$dispatch(componentName: string, eventName: string, params: any) { // tslint:disable-line:no-any
			let parent = this.$parent || this.$root;
			let name = parent.$options.name;

			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent;

				if (parent) {
					name = parent.$options.name;
				}
			}
			if (parent) {
				// @ts-ignore
				parent.$emit.apply(parent, [eventName].concat(params)); // eslint-disable-line
			}
		},
		$broadcast(componentName: string, eventName: string, params: any) { // tslint:disable-line:no-any
			broadcast.call(this, componentName, eventName, params);
		},
	},
});
