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
	layers: {
		0: board
	}
}

const getRaw = (space, x, y, z) => {
	const layer = space.layers[z];
	if(layer === undefined) {
		return undefined;
	}
	
	const row = layer[y];
	if(row === undefined) {
		return undefined;
	}
	
	return row[x];
}

const get = (space, x, y, z) => getRaw(space, x, y, z) || '.';

const printSpaceImpl = (space, tileFn) => {
	const minZ = Math.min(...Object.keys(space.layers));
	const maxZ = Math.max(...Object.keys(space.layers));
	console.log(minZ, maxZ);
	
	for(var z = minZ; z <= maxZ; z++) {
		console.log("z=", z);
		for(var y = 0; y < space.height; y++) {
			let line = "";
			for(var x = 0; x < space.width; x++) {
				const tile = tileFn(space, x, y ,z);
				line += tile;
			}
			console.log(line);
		}
		console.log();
	}
}

const printSpace = (space) => printSpaceImpl(space, get);

console.log(space);
printSpace(space);

const countNeighbours = (space, x, y, z) => {
	let get = (space, x, y, z) => getRaw(space, x, y, z) === '#' ? 1 : 0;
	
	return 0 +
		// Current layer (z) - top row
		get(space, x - 1, y - 1, z) +
		get(space, x    , y - 1, z) +
		get(space, x + 1, y - 1, z) +
		// Current layer (z) - middle row
		get(space, x - 1, y    , z) +
		get(space, x + 1, y    , z) +
		// Current layer (z) - bottom row
		get(space, x - 1, y + 1, z) +
		get(space, x    , y + 1, z) +
		get(space, x + 1, y + 1, z) +
		
		// Next layer (z + 1) - top row
		get(space, x - 1, y - 1, z + 1) +
		get(space, x    , y - 1, z + 1) +
		get(space, x + 1, y - 1, z + 1) +
		// Next layer (z + 1) - middle row
		get(space, x - 1, y    , z + 1) +
		get(space, x    , y    , z + 1) +
		get(space, x + 1, y    , z + 1) +
		// Next layer (z + 1) - bottom row
		get(space, x - 1, y + 1, z + 1) +
		get(space, x    , y + 1, z + 1) +
		get(space, x + 1, y + 1, z + 1) +
		
		// Prev layer (z - 1) - top row
		get(space, x - 1, y - 1, z - 1) +
		get(space, x    , y - 1, z - 1) +
		get(space, x + 1, y - 1, z - 1) +
		// Prev layer (z - 1) - middle row
		get(space, x - 1, y    , z - 1) +
		get(space, x    , y    , z - 1) +
		get(space, x + 1, y    , z - 1) +
		// Prev layer (z - 1) - bottom row
		get(space, x - 1, y + 1, z - 1) +
		get(space, x    , y + 1, z - 1) +
		get(space, x + 1, y + 1, z - 1);/**/
}

console.log(countNeighbours(space, 0, 0, 0));
printSpaceImpl(space, countNeighbours);

const step = (space) => {
	const newSpace = {
		width: space.width + 2,
		height: space.height + 2,
		layers: {}
	}
	
	const minZ = Math.min(...Object.keys(space.layers)) - 1;
	const maxZ = Math.max(...Object.keys(space.layers)) + 1;
	for(var z = minZ; z <= maxZ; z++) {
		const layer = [];
		for(var y = 0; y < newSpace.height; y++) {
			let row = '';
			for(var x = 0; x < newSpace.width; x++) {
				const neighbours = countNeighbours(space, x - 1, y - 1, z);
				const currTile = get(space, x - 1, y - 1, z);
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
		newSpace.layers[z] = layer;
	}
	
	return newSpace;
}

const countActive = (space) => {
	const minZ = Math.min(...Object.keys(space.layers));
	const maxZ = Math.max(...Object.keys(space.layers));
	let sum = 0;
	
	for(var z = minZ; z <= maxZ; z++) {
		for(var y = 0; y < space.height; y++) {
			for(var x = 0; x < space.width; x++) {
				if(get(space,x,y,z) === '#') {
					sum++;
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
