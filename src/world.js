export default class {
	constructor() {
		this.entities = [];
		this.entityLists = {};
	}
	
	register(entity) {
		this.entities.push(entity);
		
		for (var listId in this.entityLists) {
			if (this.entityLists.hasOwnProperty(listId)) {
				var list = this.entityLists[listId];
				
				if (entity.hasComponents(list.components)) {
					list.push(entity);
				}
			}
		}
		
		entity.onRegister();
	}
	
	getEntityList(components) {
		if (!components) {
			return this.entities;
		} else {
			var compIds = components.map(function(component) {
				return component.getName();
			});
			compIds.sort();
			
			var uid = compIds.join();
			
			if (!this.entityLists[uid]) {
				this.entityLists[uid] = {
					components: components,
					entities: []//new WeakSet()
				};
				
				// Add matching entities from World into list
				this.entities.forEach((entity) => {
					if (entity.hasComponents(components)) {
						// this.entityLists[uid].entities.add(entity);
						this.entityLists[uid].entities.push(entity);
					}
				});
			}
			
			return this.entityLists[uid].entities;
		}
	}
};