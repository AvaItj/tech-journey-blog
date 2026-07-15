'use client'

import { useState } from 'react'

type CellValue = number | null

const INITIAL_PUZZLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

function cloneBoard(board: number[][]) {
  return board.map((row) => [...row])
}

function isValidPlacement(board: number[][], row: number, col: number, value: number) {
  if (value === 0) return true

  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === value) return false
    if (i !== row && board[i][col] === value) return false
  }

  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3

  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) return false
    }
  }

  return true
}

function isSolved(board: number[][]) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return false
      if (!isValidPlacement(board, r, c, board[r][c])) return false
    }
  }
  return true
}

export default function SudokuGame() {
  const [board, setBoard] = useState<number[][]>(cloneBoard(INITIAL_PUZZLE))
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [status, setStatus] = useState('Pick a square and enter a number.')

  const handleCellClick = (row: number, col: number) => {
    if (INITIAL_PUZZLE[row][col] !== 0) {
      setStatus('That square is fixed. Pick an empty one.')
    }
    setSelectedCell([row, col])
  }

  const handleNumber = (value: number) => {
    setSelectedNumber(value)

    if (!selectedCell) {
      setStatus('Select a square first.')
      return
    }

    const [row, col] = selectedCell

    if (INITIAL_PUZZLE[row][col] !== 0) {
      setStatus('That square is fixed.')
      return
    }

    if (!isValidPlacement(board, row, col, value)) {
      setStatus('That number conflicts with the row, column, or box.')
    } else {
      setStatus('Nice move!')
    }

    setBoard((current) => {
      const next = cloneBoard(current)
      next[row][col] = value
      return next
    })

    if (isSolved(board)) {
      setStatus('You solved it!')
    }
  }

  const handleClear = () => {
    if (!selectedCell) return
    const [row, col] = selectedCell
    if (INITIAL_PUZZLE[row][col] !== 0) return

    setBoard((current) => {
      const next = cloneBoard(current)
      next[row][col] = 0
      return next
    })
    setStatus('Cleared that square.')
  }

  const resetGame = () => {
    setBoard(cloneBoard(INITIAL_PUZZLE))
    setSelectedCell(null)
    setSelectedNumber(null)
    setStatus('Puzzle reset. Pick a square and enter a number.')
  }

  return (
    <div className="rounded-3xl border border-pink-200 bg-white/90 p-5 shadow-lg shadow-pink-100">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-pink-600">Play Sudoku</h3>
        <button onClick={resetGame} className="rounded-full border border-pink-300 px-3 py-1 text-sm text-pink-700 transition hover:bg-pink-50">
          Reset
        </button>
      </div>

      <div className="mx-auto grid w-full max-w-[360px] grid-cols-9 overflow-hidden rounded-2xl border-4 border-pink-400 bg-white shadow-inner">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
            const isFixed = INITIAL_PUZZLE[rowIndex][colIndex] !== 0
            const isSameBox = selectedCell && Math.floor(selectedCell[0] / 3) === Math.floor(rowIndex / 3) && Math.floor(selectedCell[1] / 3) === Math.floor(colIndex / 3)
            const isSameNumber = selectedNumber !== null && cell === selectedNumber
            const base = 'flex h-10 w-10 items-center justify-center border border-pink-200 text-base font-bold transition-colors'
            const classes = `${base} ${isSelected ? 'bg-pink-400 text-white shadow-[inset_0_0_0_2px_#f9a8d4]' : isSameNumber ? 'bg-pink-200 text-black' : isSameBox ? 'bg-pink-50' : 'bg-white'} ${isFixed ? 'text-black' : 'text-pink-700'}`

            return (
              <button key={`${rowIndex}-${colIndex}`} onClick={() => handleCellClick(rowIndex, colIndex)} className={classes}>
                {cell === 0 ? '' : cell}
              </button>
            )
          }),
        )}
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
          <button
            key={value}
            onClick={() => handleNumber(value)}
            className={`rounded-xl border border-pink-300 px-3 py-2 text-base font-bold shadow-sm transition ${selectedNumber === value ? 'bg-pink-400 text-white' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'}`}
          >
            {value}
          </button>
        ))}
        <button onClick={handleClear} className="col-span-2 rounded-xl border border-pink-300 bg-white px-3 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-50">
          Clear
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-700">{status}</p>
    </div>
  )
}
