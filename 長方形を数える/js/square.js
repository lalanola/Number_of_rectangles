function two_dimension_coordinate_converted_all_1_is_check(arr) {
  let max_x = 0;
  let max_y = 0;
  for (let i = 0; i < arr.length; i++) {
    const [y, x] = arr[i];
    if (max_x < x) {
      max_x = x;
    }
    if (max_y < y) {
      max_y = y;
    }
  }

  let arr2 = new Array(max_y + 1)
    .fill(null)
    .map(() => new Array(max_x + 1).fill(0));

  for (let i = 0; i < arr.length; i++) {
    const [y, x] = arr[i];
    arr2[y][x] = 1;
  }
  return arr2;
}

function findConnectedOnes(arr, row, col, visited, connectedOnes) {
  if (
    row < 0 ||
    row >= arr.length ||
    col < 0 ||
    col >= arr[row].length ||
    arr[row][col] === 0 ||
    visited[row][col]
  ) {
    return;
  }

  visited[row][col] = true;
  connectedOnes.push([row, col]);

  // 上下左右について再帰的に探索
  findConnectedOnes(arr, row - 1, col, visited, connectedOnes);
  findConnectedOnes(arr, row + 1, col, visited, connectedOnes);
  findConnectedOnes(arr, row, col - 1, visited, connectedOnes);
  findConnectedOnes(arr, row, col + 1, visited, connectedOnes);
}

function findShapesWithConnectedOnes(arr) {
  const visited = Array.from({ length: arr.length }, () =>
    Array(arr[0].length).fill(false)
  );

  const shapesWithConnectedOnes = [];

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] === 1 && !visited[row][col]) {
        const connectedOnes = [];
        findConnectedOnes(arr, row, col, visited, connectedOnes);
        if (connectedOnes.length > 0) {
          shapesWithConnectedOnes.push(connectedOnes);
        }
      }
    }
  }

  return shapesWithConnectedOnes;
}
function removeZeroRowsAndColumns(matrix) {
  // 行の削除フラグと列の削除フラグを初期化
  const rowsToRemove = new Set();
  const colsToRemove = new Set();

  // 行の削除フラグをセット
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    if (row.every((value) => value === 0)) {
      rowsToRemove.add(i);
    }
  }

  // 列の削除フラグをセット
  for (let j = 0; j < matrix[0].length; j++) {
    const isZeroColumn = matrix.every((row) => row[j] === 0);
    if (isZeroColumn) {
      colsToRemove.add(j);
    }
  }

  // 新しい行列を作成して、0の行と列を除外
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    if (!rowsToRemove.has(i)) {
      const newRow = [];
      for (let j = 0; j < matrix[0].length; j++) {
        if (!colsToRemove.has(j)) {
          newRow.push(matrix[i][j]);
        }
      }
      result.push(newRow);
    }
  }

  return result.every((row) => row.every((value) => value == 1));
}

// 与えられた例のarrを使って実行
const arr3 = [
  [0, 1, 1, 0, 1, 1],
  [0, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 0],
];

const connectedShapes = findShapesWithConnectedOnes(arr3);
let check = 0;
for (let i = 0; i < connectedShapes.length; i++) {
  if (
    removeZeroRowsAndColumns(
      two_dimension_coordinate_converted_all_1_is_check(connectedShapes[i])
    )
  ) {
    check++;
  }
}
console.log(check);
