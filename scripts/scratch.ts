// esm
import { findWorkspaces, findWorkspacesRoot } from 'find-workspaces'

console.log('----------------------------------')
console.log(process.cwd())

console.log('----------------------------------')
const root = findWorkspacesRoot()
console.log(root)

console.log('----------------------------------')
const workspaces = findWorkspaces()
console.log(workspaces?.length)

// Monorepo behavior:
// - The script looks up from the directory it's in to find the first package.json
// - if it's in the

// monorepo: {
//   root: string
//   workspaces: string[]
// } | undefined
