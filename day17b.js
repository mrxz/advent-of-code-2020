let board = [
".#.",
"..#",
"###",
]

board = [
".#.#..##",
"..#....#",
"##.####.",
"...####.",
"#.##..##",
"#...##..",
"...##.##",
"#...#.#."
]

let space = {
	width: board[0].length,
	height: board.length,
	depth: 1,
	layerSets: {
		0: [board]
	}
}

const getRaw = (space, x, y, z, w) => {
	const layerSet = space.layerSets[w];
	if(layerSet === undefined) {
		return undefined;
	}
	
	const layer = layerSet[z];
	if(layer === undefined) {
		return undefined;
	}
	
	const row = layer[y];
	if(row === undefined) {
		return undefined;
	}
	
	return row[x];
}

const get = (space, x, y, z, w) => getRaw(space, x, y, z, w) || '.';

const printSpaceImpl = (space, tileFn) => {
	const minW = Math.min(...Object.keys(space.layerSets));
	const maxW = Math.max(...Object.keys(space.layerSets));
	
	for(var w = minW; w <= maxW; w++) {
		for(var z = 0; z < space.depth; z++) {
			console.log("z=", z, "w=", w);
			for(var y = 0; y < space.height; y++) {
				let line = "";
				for(var x = 0; x < space.width; x++) {
					const tile = tileFn(space, x, y, z, w);
					line += tile;
				}
				console.log(line);
			}
			console.log();
		}
	}
}

const printSpace = (space) => printSpaceImpl(space, get);

console.log(space);
printSpace(space);

const countNeighbours = (space, x, y, z, w) => {
	let get = (space, x, y, z, w) => getRaw(space, x, y, z, w) === '#' ? 1 : 0;
	
	return 0 +
		// Current layer (z) - top row
		get(space, x - 1, y - 1, z    , w) +
		get(space, x    , y - 1, z    , w) +
		get(space, x + 1, y - 1, z    , w) +
		// Current layer (z) - middle row
		get(space, x - 1, y    , z    , w) +
		get(space, x + 1, y    , z    , w) +
		// Current layer (z) - bottom row
		get(space, x - 1, y + 1, z    , w) +
		get(space, x    , y + 1, z    , w) +
		get(space, x + 1, y + 1, z    , w) +
		
		// Next layer (z + 1) - top row
		get(space, x - 1, y - 1, z + 1, w) +
		get(space, x    , y - 1, z + 1, w) +
		get(space, x + 1, y - 1, z + 1, w) +
		// Next layer (z + 1) - middle row
		get(space, x - 1, y    , z + 1, w) +
		get(space, x    , y    , z + 1, w) +
		get(space, x + 1, y    , z + 1, w) +
		// Next layer (z + 1) - bottom row
		get(space, x - 1, y + 1, z + 1, w) +
		get(space, x    , y + 1, z + 1, w) +
		get(space, x + 1, y + 1, z + 1, w) +
		
		// Prev layer (z - 1) - top row
		get(space, x - 1, y - 1, z - 1, w) +
		get(space, x    , y - 1, z - 1, w) +
		get(space, x + 1, y - 1, z - 1, w) +
		// Prev layer (z - 1) - middle row
		get(space, x - 1, y    , z - 1, w) +
		get(space, x    , y    , z - 1, w) +
		get(space, x + 1, y    , z - 1, w) +
		// Prev layer (z - 1) - bottom row
		get(space, x - 1, y + 1, z - 1, w) +
		get(space, x    , y + 1, z - 1, w) +
		get(space, x + 1, y + 1, z - 1, w) +
		
		// w - 1
		// Current layer (z) - top row
		get(space, x - 1, y - 1, z    , w - 1) +
		get(space, x    , y - 1, z    , w - 1) +
		get(space, x + 1, y - 1, z    , w - 1) +
		// Current layer (z) - middle row
		get(space, x - 1, y    , z    , w - 1) +
		get(space, x    , y    , z    , w - 1) +
		get(space, x + 1, y    , z    , w - 1) +
		// Current layer (z) - bottom row
		get(space, x - 1, y + 1, z    , w - 1) +
		get(space, x    , y + 1, z    , w - 1) +
		get(space, x + 1, y + 1, z    , w - 1) +
		
		// Next layer (z + 1) - top row
		get(space, x - 1, y - 1, z + 1, w - 1) +
		get(space, x    , y - 1, z + 1, w - 1) +
		get(space, x + 1, y - 1, z + 1, w - 1) +
		// Next layer (z + 1) - middle row
		get(space, x - 1, y    , z + 1, w - 1) +
		get(space, x    , y    , z + 1, w - 1) +
		get(space, x + 1, y    , z + 1, w - 1) +
		// Next layer (z + 1) - bottom row
		get(space, x - 1, y + 1, z + 1, w - 1) +
		get(space, x    , y + 1, z + 1, w - 1) +
		get(space, x + 1, y + 1, z + 1, w - 1) +
		
		// Prev layer (z - 1) - top row
		get(space, x - 1, y - 1, z - 1, w - 1) +
		get(space, x    , y - 1, z - 1, w - 1) +
		get(space, x + 1, y - 1, z - 1, w - 1) +
		// Prev layer (z - 1) - middle row
		get(space, x - 1, y    , z - 1, w - 1) +
		get(space, x    , y    , z - 1, w - 1) +
		get(space, x + 1, y    , z - 1, w - 1) +
		// Prev layer (z - 1) - bottom row
		get(space, x - 1, y + 1, z - 1, w - 1) +
		get(space, x    , y + 1, z - 1, w - 1) +
		get(space, x + 1, y + 1, z - 1, w - 1) +
		
		// w + 1
		// Current layer (z) - top row
		get(space, x - 1, y - 1, z    , w + 1) +
		get(space, x    , y - 1, z    , w + 1) +
		get(space, x + 1, y - 1, z    , w + 1) +
		// Current layer (z) - middle row
		get(space, x - 1, y    , z    , w + 1) +
		get(space, x    , y    , z    , w + 1) +
		get(space, x + 1, y    , z    , w + 1) +
		// Current layer (z) - bottom row
		get(space, x - 1, y + 1, z    , w + 1) +
		get(space, x    , y + 1, z    , w + 1) +
		get(space, x + 1, y + 1, z    , w + 1) +
		
		// Next layer (z + 1) - top row
		get(space, x - 1, y - 1, z + 1, w + 1) +
		get(space, x    , y - 1, z + 1, w + 1) +
		get(space, x + 1, y - 1, z + 1, w + 1) +
		// Next layer (z + 1) - middle row
		get(space, x - 1, y    , z + 1, w + 1) +
		get(space, x    , y    , z + 1, w + 1) +
		get(space, x + 1, y    , z + 1, w + 1) +
		// Next layer (z + 1) - bottom row
		get(space, x - 1, y + 1, z + 1, w + 1) +
		get(space, x    , y + 1, z + 1, w + 1) +
		get(space, x + 1, y + 1, z + 1, w + 1) +
		
		// Prev layer (z - 1) - top row
		get(space, x - 1, y - 1, z - 1, w + 1) +
		get(space, x    , y - 1, z - 1, w + 1) +
		get(space, x + 1, y - 1, z - 1, w + 1) +
		// Prev layer (z - 1) - middle row
		get(space, x - 1, y    , z - 1, w + 1) +
		get(space, x    , y    , z - 1, w + 1) +
		get(space, x + 1, y    , z - 1, w + 1) +
		// Prev layer (z - 1) - bottom row
		get(space, x - 1, y + 1, z - 1, w + 1) +
		get(space, x    , y + 1, z - 1, w + 1) +
		get(space, x + 1, y + 1, z - 1, w + 1);
}

console.log(countNeighbours(space, 0, 0, 0, 0));
printSpaceImpl(space, countNeighbours);

const step = (space) => {
	const newSpace = {
		width: space.width + 2,
		height: space.height + 2,
		depth: space.depth + 2,
		layerSets: {}
	}
	
	const minW = Math.min(...Object.keys(space.layerSets)) - 1;
	const maxW = Math.max(...Object.keys(space.layerSets)) + 1;
	
	for(var w = minW; w <= maxW; w++) {
		const layerSet = []
		for(var z = 0; z < newSpace.depth; z++) {
			const layer = [];
			for(var y = 0; y < newSpace.height; y++) {
				let row = '';
				for(var x = 0; x < newSpace.width; x++) {
					const neighbours = countNeighbours(space, x - 1, y - 1, z - 1, w);
					const currTile = get(space, x - 1, y - 1, z - 1, w);
					let newTile = '.';
					if(currTile === '#' && (neighbours == 2 || neighbours == 3)) {
						newTile = '#'
					} else if(currTile === '.' && neighbours == 3) {
						newTile = '#'
					}
					row += newTile;
				}
				layer.push(row);
			}
			layerSet.push(layer);
		}
		newSpace.layerSets[w] = layerSet;
	}
	
	return newSpace;
}

const countActive = (space) => {
	const minW = Math.min(...Object.keys(space.layerSets));
	const maxW = Math.max(...Object.keys(space.layerSets));
	let sum = 0;
	
	for(var w = minW; w <= maxW; w++) {
		for(var z = 0; z < space.depth; z++) {
			for(var y = 0; y < space.height; y++) {
				for(var x = 0; x < space.width; x++) {
					if(get(space,x,y,z,w) === '#') {
						sum++;
					}
				}
			}
		}
	}
	return sum;
}

let currSpace = space;
for(var i = 0; i < 6; i++) {
	currSpace = step(currSpace);
	console.log(i, countActive(currSpace));
	//printSpace(currSpace);
}
